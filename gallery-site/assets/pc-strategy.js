import { tween } from "./tween.js";

const spec = JSON.parse(document.getElementById("pc-strategy-spec").textContent);
const states = new Map(spec.states.map((state) => [state.id, state]));
const buttons = [...document.querySelectorAll("[data-strategy-state]")];
const frame = document.getElementById("strategy-frame");
const heading = document.getElementById("strategy-state-heading");
const description = document.getElementById("strategy-state-description");
const actions = document.getElementById("strategy-actions");
const context = document.getElementById("strategy-context");
const announcement = document.getElementById("strategy-announcement");
const transitions = {
  "crusader-kings-iii": {
    realm: { "Inspect character": "character", "Open council": "council", "Open dynasty": "dynasty" },
    character: { "Inspect realm": "realm", "Start scheme": "scheme", "Close selection": "realm" },
    council: { "Inspect character": "character", "Return to map": "realm" },
    scheme: { Cancel: "realm" },
    dynasty: { Return: "realm" },
    event: { "Choose A": "realm", "Choose B": "realm", Back: "realm" },
    war: { "Declare war": "confirm", Cancel: "realm" },
    confirm: { Cancel: "war", "Confirm declaration": "realm" },
    empty: { "Return to map": "realm" },
    error: { Return: "realm" },
  },
  "total-war-warhammer-iii": {
    campaign: { "Select settlement": "settlement", "Select army": "army", "End turn": "end-turn" },
    settlement: { Close: "campaign" },
    army: { "Recruit unit": "recruitment", Close: "campaign" },
    diplomacy: { Back: "campaign" },
    recruitment: { Return: "army" },
    deployment: { "Start battle": "battle" },
    battle: { "Open ability": "ability", "Pause battle": "pause" },
    ability: { "Cancel target": "battle" },
    pause: { Resume: "battle", "Quit battle": "confirm" },
    result: { "Return to campaign": "campaign" },
    confirm: { Cancel: "pause", "Quit battle": "campaign" },
    empty: { Return: "army" },
    error: { Return: "campaign" },
  },
};
let current = null;
let transition = null;

function render(id) {
  const state = states.get(id);
  if (!state) return;
  const previous = current;
  current = id;
  transition?.kill();
  frame.dataset.state = id;
  frame.dataset.surface = state.surface;
  frame.dataset.status = state.status;
  frame.replaceChildren();
  for (const [index, label] of state.regions.entries()) {
    const region = document.createElement("div");
    region.className = "strategy-region";
    region.dataset.region = String(index);
    region.textContent = label;
    frame.append(region);
  }
  heading.textContent = state.label;
  description.textContent = state.summary;
  context.textContent = `${spec.title} / ${state.surface} / ${state.status}`;
  actions.replaceChildren();
  for (const action of state.actions) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.textContent = action;
    button.addEventListener("click", () => {
      const target = transitions[spec.slug]?.[current]?.[action];
      if (target) select(target);
      else announcement.textContent = `${action}: illustrative control. No game command was executed.`;
    });
    actions.append(button);
  }
  buttons.forEach((button) => {
    const active = button.dataset.strategyState === id;
    button.setAttribute("aria-pressed", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  if (previous !== id) announcement.textContent = `${state.label} example selected`;
  frame.style.opacity = "0";
  frame.style.transform = "translateY(8px)";
  transition = tween({
    from: 0, to: 1, duration: 0.24, ease: "outCubic",
    onUpdate(value) {
      frame.style.opacity = String(value);
      frame.style.transform = `translateY(${(1 - value) * 8}px)`;
    },
  });
}

function select(id, { focus = false } = {}) {
  if (!states.has(id)) return;
  render(id);
  if (focus) buttons.find((button) => button.dataset.strategyState === id)?.focus();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => select(button.dataset.strategyState));
  button.addEventListener("keydown", (event) => {
    const index = buttons.indexOf(button);
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      select(buttons[(index + 1) % buttons.length].dataset.strategyState, { focus: true });
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      select(buttons[(index - 1 + buttons.length) % buttons.length].dataset.strategyState, { focus: true });
    } else if (event.key === "Escape") {
      event.preventDefault();
      select(spec.initial, { focus: true });
    }
  });
});

select(spec.initial);
