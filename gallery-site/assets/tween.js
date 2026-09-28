const BACK = 1.70158;

export const Ease = {
  linear: (t) => t,
  inQuad: (t) => t * t,
  outQuad: (t) => 1 - (1 - t) * (1 - t),
  inOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
  outCubic: (t) => 1 - (1 - t) ** 3,
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2),
  outQuart: (t) => 1 - (1 - t) ** 4,
  outBack: (t) => 1 + (BACK + 1) * (t - 1) ** 3 + BACK * (t - 1) ** 2,
};

const reduceQuery = typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
let forcedReduced = null;

export function setReducedMotion(value) {
  forcedReduced = value;
}

export function reducedMotion() {
  return forcedReduced ?? Boolean(reduceQuery?.matches);
}

const active = new Set();
let frame = 0;
let last = 0;

function loop(now) {
  const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
  last = now;
  for (const handle of [...active]) {
    if (handle.isActive) handle._step(dt);
    if (!handle.isActive) active.delete(handle);
  }
  if (active.size) {
    frame = requestAnimationFrame(loop);
  } else {
    frame = 0;
    last = 0;
  }
}

function track(handle) {
  active.add(handle);
  if (!frame) frame = requestAnimationFrame(loop);
}

export function tween({ from, to, duration, ease = "outCubic", delay = 0, onUpdate, onComplete }) {
  const easeFn = typeof ease === "function" ? ease : Ease[ease] ?? Ease.linear;
  const handle = {
    from,
    to,
    duration: reducedMotion() ? 0 : duration,
    delay: reducedMotion() ? 0 : delay,
    elapsed: 0,
    value: from,
    isActive: true,
    ease: easeFn,
    _step(dt) {
      if (this.delay > 0) {
        this.delay -= dt;
        return;
      }
      this.elapsed += dt;
      const t = this.duration <= 0 ? 1 : Math.min(this.elapsed / this.duration, 1);
      this.value = this.from + (this.to - this.from) * this.ease(t);
      onUpdate?.(this.value);
      if (t >= 1) {
        this.isActive = false;
        onComplete?.();
      }
    },
    retarget(target, newDuration) {
      this.from = this.value;
      this.to = target;
      if (newDuration !== undefined) this.duration = newDuration;
      if (reducedMotion()) this.duration = 0;
      this.delay = 0;
      this.elapsed = 0;
      this.isActive = true;
      if (this.duration <= 0) {
        this.complete();
        return this;
      }
      track(this);
      return this;
    },
    complete() {
      if (!this.isActive) return this;
      this.value = this.to;
      onUpdate?.(this.value);
      this.isActive = false;
      active.delete(this);
      onComplete?.();
      return this;
    },
    kill() {
      this.isActive = false;
      active.delete(this);
      return this;
    },
  };
  if (handle.duration <= 0 && handle.delay <= 0) {
    handle.complete();
    return handle;
  }
  track(handle);
  return handle;
}

export function sequence(steps) {
  let index = 0;
  let current = null;
  let stopped = false;
  const run = () => {
    if (stopped || index >= steps.length) return;
    const step = steps[index++];
    const userComplete = step.onComplete;
    current = tween({ ...step, onComplete: () => { userComplete?.(); run(); } });
  };
  run();
  return {
    get current() { return current; },
    kill() { stopped = true; current?.kill(); },
    complete() {
      while (!stopped && current && current.isActive) current.complete();
    },
  };
}

export function sampleEase(name, samples = 48) {
  const fn = Ease[name] ?? Ease.linear;
  return Array.from({ length: samples + 1 }, (_, i) => fn(i / samples));
}
