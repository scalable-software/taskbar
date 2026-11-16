![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Taskbar

A lightweight, self-contained web component that holds the controls of a window in one bar. The host application places the controls it wants inside the bar, such as pin, minimize, maximize, restore and close. The bar lays them out as one surface, in landscape or in portrait, reports what the end user asks of them as its own events, and passes the host's own requests on to them. It can be shown or hidden on demand, and adapts automatically to light and dark themes.

The component does not move, resize, hide or remove anything itself, and holds no condition of the window: the host application, or the panel that embeds the bar, acts on what the bar reports.

---

## 1. Introduction

The **Taskbar** component is a bridge between a host application and the controls of a window. The host works with one bar instead of with each control: it listens to the bar, and it asks the bar.

```html
<task-bar>
  <pin-button slot="start"></pin-button>
  <minimize-button slot="end"></minimize-button>
  <maximize-button slot="end"></maximize-button>
  <restore-button slot="end"></restore-button>
  <close-button slot="end"></close-button>
</task-bar>
```

```js
const taskbar = document.querySelector("task-bar");

taskbar.onclose = () => console.log("Closing was requested");
taskbar.pin();
```

The bar has three zones, and the host says where each control sits with the `slot` attribute: `start`, `center` or `end`. The centre takes the room the other two leave, so in a wide bar the pin sits at one end and the window controls at the other, with open space, or a title, between them. A control placed without one of the three names is not shown.

The bar brings no controls of its own. The host application installs, defines and places the ones its window offers: `@scalable.software/pin`, `@scalable.software/minimize`, `@scalable.software/maximize`, `@scalable.software/restore` and `@scalable.software/close`, or any other component.

### 1.1 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/scalable-software/taskbar.git
   cd taskbar
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Tests (Optional)**

   ```bash
   npm test
   ```

   - Ensures everything is working as expected before you start.

4. **Start Local Server**

   ```bash
   npm run serve
   ```

   - This builds the component and opens the demo page, with a `<task-bar>` holding the five controls at the top and its controls below it.

---

## 2. Quick Start Usage Walkthrough

This walkthrough uses the demo page to show how `<task-bar>` behaves. The page has the component in a band across the top, and three groups below it: **States**, **Operations** and **Events**.

1. **Click** the pin in the bar.
   - The pin becomes pinned, and the **Events** log shows `onpin` with `{"status":"pinned"}`. The event comes from the bar, not from the pin.
   - Click it again: the log shows `onunpin`.

2. **Click** the minimize, maximize, restore and close controls.
   - The log shows `onminimize`, `onmaximize`, `onrestore` and `onclose`, one for each request. Nothing is minimized or removed: the bar only reports.

3. **Click** `pin` in the **Operations** group.
   - The host application makes the same request from code: the pin in the bar becomes pinned and the log shows `onpin`.
   - Click `pin` again: the pin is already pinned, so nothing is logged.

4. **Click** `minimize`, `maximize`, `restore` and `close` in the **Operations** group.
   - Each asks the matching control to make its request, and the bar reports it.

5. **Click** `hide`, then `show`.
   - The bar disappears and comes back. The log shows `onhide` and `onshow`, each with its `detail`.

6. **Choose** `portrait` for `orientation` in the **States** group.
   - The controls sit one above the other, in the same order.

   The page shows two bars. The second is half as wide as the window: its pin stays at the start, its window controls at the end, and the centre between them is empty. Narrow the window: the bar stops shrinking once it is as wide as its controls.

7. **Inspect** the `<task-bar>` in the **Elements** tab.
   - Every control inside it carries `appearance="flat"`: the bar gave it that, so that the bar reads as one surface.

8. **Open the Developer Tools**, select the **Console**, and take a control out:

   ```js
   const taskbar = document.querySelector("task-bar");

   taskbar.querySelector("restore-button").remove();
   taskbar.restore();
   ```

   - Nothing happens and no error is reported: the bar holds no control for that request.

For more details on **States**, **Operations**, and **Events**, consult the sections below or check the generated **API documentation** (see `npm run document`).

---

## 3. Architectural Overview

### 3.1 Composition

- **Template** (`taskbar.template.html`): Defines DOM structure — a `.bar` surface holding three slots, `start`, `center` and `end`, where the controls the host places inside `<task-bar>` are shown.
- **Style** (`taskbar.style.css`): Encapsulates the surface of the bar, its three zones, the two orientations, and light/dark theme adaptation. The bar is as high as its controls, leaves no space between them, and is never narrower than the controls it holds.
- **Class** (`taskbar.ts`): Extends the base component class to handle lifecycle hooks, attribute reflection, listening to the controls, and event dispatch.

The controls are the host's own elements. They are not part of the bar's template, and the host can still reach them: to hide the maximize control while the window is maximized, for instance, the host calls `hide()` on that control.

### 3.2 Class Lifecycle

- **`connectedCallback()`**
  1. Caches the bar and its three slots.
  2. Makes every control already placed in the bar flat.
  3. Listens to the bar for controls being placed in a slot or taken out, and to every control already placed.

- **`disconnectedCallback()`**
  - Stops listening to the bar and to every control.

---

## 4. Core Concepts: State, Operations, Events, and Gestures

### 4.1 State

- **`visibility`** (`visible` | `hidden`)
  - Whether the bar, with its controls, is displayed.
  - **Optional attribute**: absent from the DOM when `visible` (the default); present as `[visibility="hidden"]` when hidden.

- **`orientation`** (`landscape` | `portrait`)
  - Whether the controls are laid out side by side or one above the other.
  - **Optional attribute**: absent from the DOM when `landscape` (the default); present as `[orientation="portrait"]` when in portrait.
  - It changes how the bar is laid out, not what it does: it has no operation and sends no event.

Any other value is rejected: assigning it to the property throws, and writing it to the attribute puts the current state back.

The bar holds nothing else. Whether the window is pinned is held by the pin; whether it is minimized or maximized is held by the host application.

### 4.2 Operations

| Operation | What it does |
|---|---|
| `hide()` | hides the bar |
| `show()` | shows the bar |
| `pin()` | asks each control in the bar that offers `pin` to pin |
| `unpin()` | asks each control in the bar that offers `unpin` to unpin |
| `minimize()` | asks each control in the bar that offers `minimize` to request minimizing |
| `maximize()` | asks each control in the bar that offers `maximize` to request maximizing |
| `restore()` | asks each control in the bar that offers `restore` to request restoring |
| `close()` | asks each control in the bar that offers `close` to request closing |

The last six change no state of the bar, and do nothing when no control in the bar offers the operation. A control is recognised by the operation it offers, not by its tag, so a host can place a control of its own that offers `minimize()`.

### 4.3 Events

| Event | Dispatched when | `detail` |
|---|---|---|
| `onhide` | the bar becomes hidden | `{ visibility: "hidden" }` |
| `onshow` | the bar becomes visible | `{ visibility: "visible" }` |
| `onpin` | a pin in the bar reports that it was pinned | `{ status: "pinned" }` |
| `onunpin` | a pin in the bar reports that it was unpinned | `{ status: "unpinned" }` |
| `onminimize` | a control in the bar reports that minimizing is requested | — |
| `onmaximize` | a control in the bar reports that maximizing is requested | — |
| `onrestore` | a control in the bar reports that restoring is requested | — |
| `onclose` | a control in the bar reports that closing is requested | — |

- Subscribe with the property of the same name, such as `taskbar.onpin = handler`, or with `addEventListener("onpin", handler)`. `onevent` receives every event.
- A control that is hidden or shown on its own does not make the bar dispatch `onhide` or `onshow`.
- Any other event of a component placed in the bar is not repeated: the host listens to that component itself.
- `onclose` overrides the property of the same name that every HTML element has.

### 4.4 Gestures

- **`slotchange`**: when a control is placed in one of the three slots or taken out, the bar listens to every control it now holds, stops listening to one that was taken out, and gives every control that has an `appearance` the value `flat`.
- **`onpin`, `onunpin`, `onminimize`, `onmaximize`, `onrestore`, `onclose`**: heard on each control through `addEventListener`, so the control's own `on…` properties stay free for the host. Each leads to the bar's event of the same name.

---

## 5. Development Workflow

### 5.1 Testing

Unit tests run with Karma + Jasmine. The specification is checked first, then the suite covers composition, states, validation, operations, events, and gestures. The suite places the real controls in the bar, which is why they are development dependencies.

```bash
npm test
```

### 5.2 Documentation (Typedoc)

```bash
npm run document
```

Auto-generates API docs from TypeScript annotations.

### 5.3 Import Maps

The host maps the bar, the base component, and each control it places:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/taskbar": "./node_modules/@scalable.software/taskbar/dist/index.js",
      "@scalable.software/component": "./node_modules/@scalable.software/component/dist/index.js",
      "@scalable.software/pin": "./node_modules/@scalable.software/pin/dist/index.js"
    }
  }
</script>
```

```js
import { Taskbar, Zone } from "@scalable.software/taskbar";
import { Pin } from "@scalable.software/pin";

await Pin.Template.load("pin.template.html");
customElements.define(Pin.Tag, Pin);

await Taskbar.Template.load("taskbar.template.html");
customElements.define(Taskbar.Tag, Taskbar);
```

The names of the zones are exported as `Zone.START`, `Zone.CENTER` and `Zone.END`, for a host that places controls from code:

```js
const pin = document.createElement(Pin.Tag);
pin.slot = Zone.START;
document.querySelector(Taskbar.Tag).append(pin);
```

Define the controls before the bar, so that a control already in the markup can be made flat the moment the bar is connected.

## License

> This software and its documentation are released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA 4.0). This means you are free to share, copy, distribute, and transmit the work, and to adapt it, but only under the following conditions:
>
> Attribution: You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
>
> NonCommercial: You may not use this material for commercial purposes.
>
> ShareAlike: If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
>
> For more details, please visit the full [license agreement](https://creativecommons.org/licenses/by-nc-sa/4.0/).
