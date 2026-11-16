import {
  Taskbar,
  State,
  Visibility,
  Orientation,
  Control,
  Operation
} from "@scalable.software/taskbar";

import { Pin, Operation as PinOperation } from "@scalable.software/pin";
import {
  Minimize,
  Operation as MinimizeOperation
} from "@scalable.software/minimize";
import {
  Maximize,
  Operation as MaximizeOperation
} from "@scalable.software/maximize";
import {
  Restore,
  Operation as RestoreOperation
} from "@scalable.software/restore";
import { Close, Operation as CloseOperation } from "@scalable.software/close";

// The controls the taskbar holds in its template: the host loads their templates and
// defines them, before the taskbar.
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

const addOperation = (label, invoke) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", () => taskbars.forEach(invoke));
  operations.append(button);
};

// The taskbar's own operations.
Object.values(Operation).forEach((operation) =>
  addOperation(operation, (each) => each[operation]())
);

// The operations of each control, reached through its member: `taskbar.pin.pin()`.
const offered = {
  [Control.PIN]: PinOperation,
  [Control.MINIMIZE]: MinimizeOperation,
  [Control.MAXIMIZE]: MaximizeOperation,
  [Control.RESTORE]: RestoreOperation,
  [Control.CLOSE]: CloseOperation
};

Object.entries(offered).forEach(([control, list]) =>
  Object.values(list).forEach((operation) =>
    addOperation(`${control}.${operation}`, (each) =>
      each[control][operation]()
    )
  )
);

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

// `onevent` receives every event, and leaves the `on…` properties free. The taskbar
// dispatches its own events only: what a control reports is heard on the control itself,
// reached through its member.
taskbars.forEach((each, index) => {
  const source = index === 0 ? "first" : "wide";
  each.onevent = (event) => log(event, source);
  Object.values(Control).forEach(
    (control) =>
      (each[control].onevent = (event) => log(event, `${source} ${control}`))
  );
});

document
  .querySelector("#clear")
  .addEventListener("click", () => events.replaceChildren());
