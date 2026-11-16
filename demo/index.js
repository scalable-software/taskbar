import {
  Taskbar,
  State,
  Visibility,
  Orientation,
  Operation
} from "@scalable.software/taskbar";

import { Pin } from "@scalable.software/pin";
import { Minimize } from "@scalable.software/minimize";
import { Maximize } from "@scalable.software/maximize";
import { Restore } from "@scalable.software/restore";
import { Close } from "@scalable.software/close";

// The controls the page places in the taskbar: a host defines the ones it uses.
const controls = {
  "pin.template.html": Pin,
  "minimize.template.html": Minimize,
  "maximize.template.html": Maximize,
  "restore.template.html": Restore,
  "close.template.html": Close
};

for (const [template, Control] of Object.entries(controls)) {
  await Control.Template.load(template);
  customElements.define(Control.Tag, Control);
}

await Taskbar.Template.load("taskbar.template.html");

customElements.define(Taskbar.Tag, Taskbar);

// Two taskbars: one as wide as its controls, one as wide as half the window.
// The page drives both, and follows the first.
const taskbars = [...document.querySelectorAll(Taskbar.Tag)];
const [taskbar] = taskbars;

/* ───────────────────────────── States ───────────────────────────── */

// The value list of each writable state. A state without one is readonly.
const choices = {
  [State.VISIBILITY]: Visibility,
  [State.ORIENTATION]: Orientation
};

const states = document.querySelector("#states");

const addChoice = (state, values) => {
  const select = document.createElement("select");
  select.id = state;
  Object.values(values).forEach((value) => select.add(new Option(value)));
  select.addEventListener("change", () =>
    taskbars.forEach((each) => (each[state] = select.value))
  );
  return select;
};

const addText = (state) => {
  const output = document.createElement("output");
  output.id = state;
  output.title = "readonly";
  return output;
};

Object.values(State).forEach((state) => {
  const name = document.createElement("dt");
  const label = document.createElement("label");
  label.htmlFor = state;
  label.textContent = choices[state] ? state : `${state} (readonly)`;
  name.append(label);

  const value = document.createElement("dd");
  value.append(
    choices[state] ? addChoice(state, choices[state]) : addText(state)
  );

  states.append(name, value);
});

// States are attributes: follow the component when it changes one itself.
const follow = () =>
  Object.values(State).forEach(
    (state) => (states.querySelector(`#${state}`).value = taskbar[state])
  );

new MutationObserver(follow).observe(taskbar, { attributes: true });
follow();

/* ───────────────────────────── Operations ───────────────────────────── */

const operations = document.querySelector("#operations");

Object.values(Operation).forEach((operation) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = operation;
  button.addEventListener("click", () =>
    taskbars.forEach((each) => each[operation]())
  );
  operations.append(button);
});

/* ───────────────────────────── Events ───────────────────────────── */

const events = document.querySelector("#events");

const log = (event, source) => {
  const entry = document.createElement("li");

  const time = document.createElement("time");
  time.textContent = new Date().toLocaleTimeString();

  const type = document.createElement("strong");
  type.textContent = event.type;

  const from = document.createElement("span");
  from.textContent = source;

  entry.append(time, from, type);

  if (event.detail !== null) {
    const detail = document.createElement("code");
    detail.textContent = JSON.stringify(event.detail);
    entry.append(detail);
  }

  events.append(entry);
};

// `onevent` receives every event, and leaves the `on…` properties free.
taskbars.forEach(
  (each, index) =>
    (each.onevent = (event) => log(event, index === 0 ? "first" : "wide"))
);

document
  .querySelector("#clear")
  .addEventListener("click", () => events.replaceChildren());
