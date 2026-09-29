import { Ease, reducedMotion, sampleEase, setReducedMotion, tween } from "./tween.js";

const spec = JSON.parse(document.getElementById("element-spec").textContent);
const viewport = document.querySelector(".viewport");
const frame = viewport.querySelector(".focus-frame");
const live = document.getElementById("live");
const ui = {
  ease: document.getElementById("ease"),
  duration: document.getElementById("duration"),
  value: document.getElementById("readout-value"),
  target: document.getElementById("readout-target"),
  status: document.getElementById("readout-status"),
  elapsed: document.getElementById("readout-elapsed"),
  curve: document.getElementById("curve"),
  reduced: document.getElementById("reduced"),
};

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const fmt = (v) => (Math.round(v * 1000) / 1000).toFixed(3);
const announce = (text) => {
  live.textContent = "";
  requestAnimationFrame(() => {
    live.textContent = text;
  });
};

const controls = () => [...viewport.querySelectorAll(".wf[data-kind='control']")];
const boxOf = (el) => {
  const vr = viewport.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: (r.left - vr.left) / vr.width, y: (r.top - vr.top) / vr.height, w: r.width / vr.width, h: r.height / vr.height };
};

const focus = {
  index: -1,
  box: null,
  handle: null,
  scope: () => (modal.open ? [...viewport.querySelectorAll(".wf-modal-actions span")] : controls()),
  place(box) {
    this.box = box;
    const vr = viewport.getBoundingClientRect();
    frame.style.transform = `translate(${box.x * vr.width - 3}px, ${box.y * vr.height - 3}px)`;
    frame.style.inlineSize = `${box.w * vr.width + 6}px`;
    frame.style.blockSize = `${box.h * vr.height + 6}px`;
  },
  moveTo(index, { duration = 0.18, ease = "outCubic", track = false } = {}) {
    const items = this.scope();
    if (!items.length) return null;
    this.index = (index + items.length) % items.length;
    items.forEach((el, i) => el.setAttribute("data-selected", String(i === this.index)));
    viewport.setAttribute("aria-activedescendant", items[this.index].id);
    const toBox = boxOf(items[this.index]);
    const fromBox = this.box ?? toBox;
    viewport.dataset.focus = "on";
    this.handle?.kill();
    this.handle = tween({
      from: 0,
      to: 1,
      duration,
      ease,
      onUpdate: (t) => {
        this.place({ x: lerp(fromBox.x, toBox.x, t), y: lerp(fromBox.y, toBox.y, t), w: lerp(fromBox.w, toBox.w, t), h: lerp(fromBox.h, toBox.h, t) });
        if (track) render(t, 1);
      },
    });
    return this.handle;
  },
  nearest(dx, dy) {
    const items = this.scope();
    if (!items.length) return;
    if (this.index < 0) return this.moveTo(0);
    const from = boxOf(items[this.index]);
    const cx = from.x + from.w / 2;
    const cy = from.y + from.h / 2;
    let best = -1;
    let bestScore = Infinity;
    items.forEach((el, i) => {
      if (i === this.index) return;
      const b = boxOf(el);
      const vx = b.x + b.w / 2 - cx;
      const vy = b.y + b.h / 2 - cy;
      const along = vx * dx + vy * dy;
      if (along <= 0.001) return;
      const across = Math.abs(vx * dy - vy * dx);
      const score = along + across * 2.2;
      if (score < bestScore) {
        bestScore = score;
        best = i;
      }
    });
    if (best >= 0) this.moveTo(best);
  },
};

const overlay = viewport.querySelector(".wf-overlay");
const backdrop = overlay.querySelector(".wf-backdrop");
const modalBox = overlay.querySelector(".wf-modal");
const modal = {
  open: false,
  opener: -1,
  handle: null,
  apply(v) {
    backdrop.style.opacity = String(v);
    modalBox.style.opacity = String(clamp01(v * 1.4));
    modalBox.style.transform = `scale(${0.94 + 0.06 * v})`;
    overlay.style.pointerEvents = v > 0.5 ? "auto" : "none";
  },
  current: 0,
  setOpen(open, { duration = 0.43, ease = "outCubic", track = false } = {}) {
    if (open === this.open && this.handle?.isActive) return this.handle;
    const from = this.current;
    this.open = open;
    if (open) this.opener = focus.index;
    this.handle?.kill();
    this.handle = tween({
      from,
      to: open ? 1 : 0,
      duration: open ? duration : Math.min(duration, 0.14),
      ease,
      onUpdate: (v) => {
        this.current = v;
        this.apply(v);
        if (track) render(v, open ? 1 : 0);
      },
      onComplete: () => {
        if (this.open) {
          focus.box = null;
          focus.moveTo(0);
          announce(`${modalBox.querySelector("strong").textContent} dialog open. Focus is on ${focus.scope()[0]?.textContent}.`);
        } else {
          focus.box = null;
          if (this.opener >= 0) focus.moveTo(this.opener);
          announce("Dialog closed. Focus returned to the control that opened it.");
        }
      },
    });
    return this.handle;
  },
};

function curveOf(name) {
  const ctx = ui.curve.getContext("2d");
  const { width, height } = ui.curve;
  const samples = sampleEase(name, 64);
  const lo = Math.min(0, ...samples);
  const hi = Math.max(1, ...samples);
  const y = (v) => height - 10 - ((v - lo) / (hi - lo)) * (height - 20);
  return { ctx, width, height, samples, y };
}

function drawCurve(progress = null) {
  const { ctx, width, height, samples, y } = curveOf(ui.ease.value);
  const style = getComputedStyle(document.documentElement);
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = style.getPropertyValue("--border-default");
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(8, y(0));
  ctx.lineTo(width - 8, y(0));
  ctx.moveTo(8, y(1));
  ctx.lineTo(width - 8, y(1));
  ctx.stroke();
  ctx.strokeStyle = style.getPropertyValue("--wire-ink");
  ctx.lineWidth = 2;
  ctx.beginPath();
  samples.forEach((v, i) => {
    const x = 8 + (i / (samples.length - 1)) * (width - 16);
    if (i === 0) ctx.moveTo(x, y(v));
    else ctx.lineTo(x, y(v));
  });
  ctx.stroke();
  if (progress !== null) {
    const p = clamp01(progress);
    const v = Ease[ui.ease.value](p);
    ctx.fillStyle = style.getPropertyValue("--accent-interact");
    ctx.beginPath();
    ctx.arc(8 + p * (width - 16), y(v), 4.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

let active = null;
let status = "idle";
let lastTarget = 0;

function render(value, target) {
  ui.value.textContent = fmt(value);
  ui.target.textContent = fmt(target);
  ui.status.textContent = status;
  if (active) {
    ui.elapsed.textContent = `${fmt(Math.max(0, active.elapsed))} s`;
    drawCurve(active.duration > 0 ? active.elapsed / active.duration : 1);
  }
}

function makeDemo() {
  const kind = spec.demo;
  const bars = [...viewport.querySelectorAll(".wf[data-kind='bar']")];
  if (kind === "hudBar") {
    const compare = spec.slug === "stats";
    const targets = bars.map((bar) => Number(bar.dataset.fill));
    const alt = targets.map((f, i) => (compare ? clamp01(f + (i % 2 ? -0.18 : 0.14)) : f));
    const trailHandles = new Map();
    const trailValues = targets.slice();
    const setFill = (bar, v) => {
      bar.querySelector(".wf-fill:not(.wf-fill-trail)").style.transform = `scaleX(${v})`;
    };
    const setTrail = (bar, v) => {
      bar.querySelector(".wf-fill-trail").style.transform = `scaleX(${v})`;
    };
    return {
      a: 0,
      b: 1,
      duration: 0.45,
      ease: "outCubic",
      label: compare ? "Compare item" : "Damage and heal",
      apply(v) {
        bars.forEach((bar, i) => {
          const full = compare ? lerp(targets[i], alt[i], v) : i === 0 ? lerp(1, 0.35, v) : lerp(targets[i], targets[i] * 0.6, v);
          setFill(bar, full);
          if (full >= trailValues[i]) {
            trailHandles.get(i)?.kill();
            trailValues[i] = full;
            setTrail(bar, full);
          } else if (!trailHandles.get(i)?.isActive) {
            const from = trailValues[i];
            trailHandles.set(i, tween({ from, to: full, duration: 0.6, delay: 0.25, ease: "inQuad", onUpdate: (tv) => { trailValues[i] = tv; setTrail(bar, tv); } }));
          } else {
            trailHandles.get(i).retarget(full);
          }
        });
      },
    };
  }
  if (kind === "modal") {
    return {
      a: 0,
      b: 1,
      duration: 0.43,
      ease: "outCubic",
      label: "Open and close",
      custom(target, duration, ease) {
        return modal.setOpen(target > 0.5, { duration, ease, track: true });
      },
      apply(v) {
        modal.apply(v);
      },
    };
  }
  if (kind === "tabs" || kind === "carousel") {
    const strip = viewport.querySelector(".wf-strip");
    const count = strip.children.length;
    return {
      a: 0,
      b: count - 1,
      duration: kind === "tabs" ? 0.3 : 0.35,
      ease: kind === "tabs" ? "inOutCubic" : "outCubic",
      label: kind === "tabs" ? "Next tab" : "Next character",
      next: (cur) => (Math.round(cur) + 1) % count,
      interrupt: (cur, target) => (target > cur ? Math.max(0, Math.floor(cur)) : Math.min(count - 1, Math.ceil(cur))),
      apply(v) {
        strip.style.transform = `translateX(${(-v * 100) / count}%)`;
        if (kind === "tabs") {
          controls().slice(0, count).forEach((el, i) => el.setAttribute("aria-current", String(Math.round(v) === i)));
        }
      },
    };
  }
  if (kind === "grid" || kind === "scroll") {
    const track = viewport.querySelector(".wf-track");
    const max = Number(track.dataset.max);
    return {
      a: 0,
      b: max,
      duration: kind === "grid" ? 0.8 : 6,
      ease: kind === "grid" ? "outQuart" : "linear",
      label: kind === "grid" ? "Scroll to end" : "Roll credits",
      apply(v) {
        track.style.transform = `translateY(${-v}%)`;
      },
    };
  }
  if (kind === "pan") {
    const map = viewport.querySelector(".wf-map");
    return {
      a: 0,
      b: 1,
      duration: 0.7,
      ease: "inOutCubic",
      label: "Pan to waypoint",
      apply(v) {
        map.style.transform = `translate(${-18 * v}%, ${-12 * v}%) scale(${1 + 0.6 * v})`;
        const zoom = viewport.querySelector("[data-zoom]");
        if (zoom) zoom.textContent = `Zoom ${(1 + 0.6 * v).toFixed(1)}x`;
      },
    };
  }
  if (kind === "progressBar") {
    const bar = bars[0];
    return {
      a: 0,
      b: 1,
      duration: spec.slug === "progress" ? 1.2 : 2,
      ease: spec.slug === "progress" ? "outCubic" : "linear",
      label: spec.slug === "progress" ? "Count experience" : "Load",
      next: (cur) => (cur >= 0.999 ? 0 : 1),
      restartFromA: true,
      apply(v) {
        bar.querySelector(".wf-fill:not(.wf-fill-trail)").style.transform = `scaleX(${v})`;
        bar.querySelector(".wf-fill-trail").style.transform = "scaleX(0)";
      },
    };
  }
  if (kind === "typewriter") {
    const box = viewport.querySelector(".wf-line");
    const text = spec.line;
    return {
      a: 0,
      b: text.length,
      duration: 2.4,
      ease: "linear",
      label: "Reveal line",
      restartFromA: true,
      next: (cur) => (cur >= text.length - 0.5 ? 0 : text.length),
      apply(v) {
        const n = Math.round(v);
        box.firstChild.textContent = text.slice(0, n);
        box.lastChild.textContent = text.slice(n);
      },
    };
  }
  if (kind === "unlock") {
    const node = controls()[3];
    return {
      a: 0,
      b: 1,
      duration: 0.5,
      ease: "outBack",
      label: "Unlock capstone",
      apply(v) {
        node.style.transform = `scale(${0.85 + 0.15 * v})`;
        node.style.opacity = String(0.4 + 0.6 * clamp01(v));
        node.setAttribute("data-selected", String(v > 0.5));
      },
    };
  }
  if (kind === "rank") {
    const rows = [...viewport.querySelectorAll(".wf-row")];
    return {
      a: 0,
      b: 1,
      duration: 0.45,
      ease: "outCubic",
      label: "Swap ranks 1 and 2",
      apply(v) {
        rows[0].style.transform = `translateY(${100 * v}%)`;
        rows[1].style.transform = `translateY(${-100 * v}%)`;
      },
    };
  }
  if (kind === "coach") {
    const pointer = viewport.querySelector(".wf-pointer");
    const [dodge, attack] = controls();
    return {
      a: 0,
      b: 1,
      duration: 0.6,
      ease: "inOutQuad",
      label: "Point at next step",
      apply(v) {
        const a = boxOf(dodge);
        const b = boxOf(attack);
        const vr = viewport.getBoundingClientRect();
        pointer.style.transform = `translate(${lerp(a.x + a.w / 2, b.x + b.w / 2, v) * vr.width}px, ${(lerp(a.y, b.y, v) - 0.1) * vr.height}px)`;
      },
    };
  }
  return {
    a: 0,
    b: 1,
    duration: 0.18,
    ease: "outCubic",
    label: "Move focus",
    focusDemo: true,
    apply() {},
  };
}

const demo = makeDemo();
let demoValue = demo.a;
demo.apply(demoValue);
ui.ease.value = demo.ease;
ui.duration.value = String(demo.duration);
document.getElementById("demo-label").textContent = demo.label;

function start(target, fromOverride) {
  const duration = Math.max(0, Number(ui.duration.value) || 0);
  const ease = ui.ease.value;
  lastTarget = target;
  status = "running";
  if (demo.focusDemo) {
    active = focus.moveTo(target, { duration, ease, track: true });
    active.onDone = null;
    return active;
  }
  if (demo.custom) {
    active = demo.custom(target, duration, ease);
    watch(active, target);
    return active;
  }
  active?.kill();
  active = tween({
    from: fromOverride ?? demoValue,
    to: target,
    duration,
    ease,
    onUpdate: (v) => {
      demoValue = v;
      demo.apply(v);
      render(v, target);
    },
    onComplete: () => {
      status = "completed";
      render(demoValue, target);
      announce(`Complete fired at ${fmt(demoValue)}.`);
    },
  });
  return active;
}

function watch(handle, target) {
  const tick = () => {
    if (handle !== active) return;
    if (handle.isActive) {
      requestAnimationFrame(tick);
      return;
    }
    if (status === "running") status = "completed";
    render(handle.value, target);
  };
  requestAnimationFrame(tick);
}

function play() {
  if (demo.focusDemo) {
    start(focus.index + 1);
    announce(`Focus moved to ${focus.scope()[focus.index]?.textContent}.`);
    return;
  }
  const current = demo.custom ? modal.current : demoValue;
  const target = demo.next ? demo.next(current) : current > (demo.a + demo.b) / 2 ? demo.a : demo.b;
  if (demo.restartFromA && target === demo.b && current >= demo.b - 0.001) {
    start(demo.b, demo.a);
    return;
  }
  if (demo.restartFromA && target === demo.a) {
    start(demo.b, demo.a);
    return;
  }
  start(target);
}

function interrupt() {
  if (!active?.isActive) {
    play();
    const handle = active;
    const midway = () => {
      if (handle !== active || !handle?.isActive) return;
      if (handle.elapsed >= handle.duration * 0.45) interrupt();
      else requestAnimationFrame(midway);
    };
    requestAnimationFrame(midway);
    return;
  }
  if (demo.focusDemo) {
    const back = focus.index - 1;
    active = focus.moveTo(back, { duration: Number(ui.duration.value), ease: ui.ease.value, track: true });
    announce(`Retargeted mid-flight to ${focus.scope()[focus.index]?.textContent}; the frame continued from where it was.`);
    return;
  }
  const current = demo.custom ? modal.current : demoValue;
  const newTarget = demo.interrupt ? demo.interrupt(current, lastTarget) : lastTarget === demo.b ? demo.a : demo.b;
  if (demo.custom) {
    start(newTarget);
  } else {
    lastTarget = newTarget;
    active.retarget(newTarget);
  }
  status = "running";
  announce(`Retargeted at ${fmt(current)} toward ${fmt(newTarget)} without jumping.`);
}

function complete() {
  if (!active?.isActive) return;
  active.complete();
  status = "completed";
  render(active.value, lastTarget);
}

function kill() {
  if (!active?.isActive) return;
  active.kill();
  status = "killed";
  render(active.value, lastTarget);
  announce(`Killed at ${fmt(active.value)}. No complete callback fired.`);
}

document.querySelectorAll("[data-act]").forEach((button) => {
  const act = { play, interrupt, complete, kill }[button.dataset.act];
  button.addEventListener("click", act);
});

ui.ease.addEventListener("change", () => drawCurve());
ui.reduced.checked = reducedMotion();
ui.reduced.addEventListener("change", () => {
  setReducedMotion(ui.reduced.checked ? true : null);
  announce(ui.reduced.checked ? "Reduced motion on: tweens apply instantly and callbacks still fire." : "Reduced motion follows the system setting.");
});

document.querySelectorAll("[data-state-option]").forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelectorAll("[data-state-option]").forEach((o) => o.setAttribute("aria-checked", String(o === option)));
    const state = option.dataset.stateOption;
    viewport.dataset.state = state;
    if (state === "modal" && !modal.open) modal.setOpen(true);
    if (state !== "modal" && modal.open && spec.demo !== "modal") modal.setOpen(false);
    announce(`State: ${option.textContent.trim()}.`);
  });
});

function cancel() {
  if (modal.open) {
    modal.setOpen(false);
    return;
  }
  if (spec.cancel === "modal") {
    modal.setOpen(true);
    return;
  }
  if (spec.cancel === "none") {
    announce("Cancel is not available on this screen.");
    return;
  }
  announce("Back: the screen would close and focus returns to the opener.");
}

function activate() {
  const items = focus.scope();
  const el = items[focus.index];
  if (!el) return;
  if (modal.open) {
    announce(`${el.textContent} chosen.`);
    modal.setOpen(false);
    return;
  }
  if (spec.demo === "modal" || spec.demo === "tabs" || spec.demo === "carousel") {
    if (spec.demo === "tabs" && focus.index < spec.tabs.length) {
      start(focus.index);
      return;
    }
    if (spec.demo === "carousel" && focus.index < 2) {
      const count = spec.carousel.length;
      start(focus.index === 0 ? Math.max(0, Math.round(demoValue) - 1) : Math.min(count - 1, Math.round(demoValue) + 1));
      return;
    }
    if (spec.demo === "modal") {
      start(1);
      return;
    }
  }
  el.animate?.([{ transform: "scale(0.96)" }, { transform: "scale(1)" }], { duration: reducedMotion() ? 0 : 120 });
  announce(`${el.textContent} pressed.`);
}

viewport.addEventListener("keydown", (event) => {
  const keys = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
  if (keys[event.key]) {
    event.preventDefault();
    focus.nearest(...keys[event.key]);
    return;
  }
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    activate();
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    cancel();
  }
});

viewport.addEventListener("focus", () => {
  if (focus.index < 0) focus.moveTo(0);
});

viewport.addEventListener("click", (event) => {
  const target = event.target.closest(".wf[data-kind='control'], .wf-modal-actions span");
  if (!target) return;
  const items = focus.scope();
  const index = items.indexOf(target);
  if (index >= 0) {
    focus.moveTo(index);
    activate();
  }
});

new ResizeObserver(() => {
  if (focus.index >= 0) {
    const el = focus.scope()[focus.index];
    if (el) focus.place(boxOf(el));
  }
  demo.apply(demo.custom ? modal.current : demoValue);
}).observe(viewport);

drawCurve();
render(demoValue, demo.b);
if (spec.autoOpen) setTimeout(() => modal.setOpen(true), 400);
