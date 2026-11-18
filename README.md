![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Taskbar

A lightweight, self-contained web component that brings the controls of a window in one bar: the pin at its start, and the minimize, maximize, restore and close controls at its end. The bar lays them out as one surface, in landscape or in portrait, and offers each control to the host application as a read-only member, such as `taskbar.pin`. It can be shown or hidden on demand, and adapts automatically to light and dark themes.

The component does not move, resize, hide or remove anything itself, holds no condition of the window, and repeats no event of a control: the host application, or the panel that embeds the bar, listens to each control through the bar and acts on what it reports.

---

## 1. Introduction

The **Taskbar** component gives a host application the controls of a window with one element. The host places the bar, and reaches each control through it.

```html
<task-bar></task-bar>
```

```js
const taskbar = document.querySelector("task-bar");

taskbar.close.onclose = () => console.log("Closing was requested");
taskbar.pin.pin();
taskbar.maximize.hide();
```

Each member is the control itself, with the states, operations and events of its own package. The five controls and their places are fixed. Content the host places inside `<task-bar>`, such as a title, is shown in the centre of the bar, between the pin and the window controls; the bar neither listens to it nor changes it.

The bar depends on `@scalable.software/pin`, `@scalable.software/minimize`, `@scalable.software/maximize`, `@scalable.software/restore` and `@scalable.software/close`. The host application still defines these five controls and loads their templates, before the bar.

### 1.1 Upgrading from 0.1.0

This version changes how a host works with the bar.

| In 0.1.0 | Now |
|---|---|
| the host places the controls inside `<task-bar>`, with `slot="start"`, `"center"` or `"end"` | the bar brings the five controls; a control placed for `start` or `end` is no longer shown |
| `taskbar.pin()`, `unpin()`, `minimize()`, `maximize()`, `restore()`, `close()` | `taskbar.pin.pin()`, `taskbar.pin.unpin()`, `taskbar.minimize.minimize()`, and so on |
| `taskbar.onpin`, `onunpin`, `onminimize`, `onmaximize`, `onrestore`, `onclose` | `taskbar.pin.onpin`, `taskbar.pin.onunpin`, `taskbar.minimize.onminimize`, and so on |
| the lists `Zone` and `Appearance` | gone; the list `Control` names the five members |

### 1.2 Installation & Setup

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

   - This builds the component and opens the demo page, with two `<task-bar>` elements at the top and their controls below them.

---

## 2. Quick Start Usage Walkthrough

This walkthrough uses the demo page to show how `<task-bar>` behaves. The page has the component in a band across the top, and three groups below it: **States**, **Operations** and **Events**.

1. **Click** the pin in the bar.
   - The pin becomes pinned, and the **Events** log shows `onpin` with `{"status":"pinned"}`, from the pin of that bar. The bar itself sends nothing.
   - Click it again: the log shows `onunpin`.

2. **Click** the minimize, maximize, restore and close controls.
   - The log shows `onminimize`, `onmaximize`, `onrestore` and `onclose`, each from its own control. Nothing is minimized or removed: a control only reports.

3. **Click** `pin.pin` in the **Operations** group.
   - The host application makes the same request from code, with `taskbar.pin.pin()`: the pin becomes pinned and the log shows `onpin`.
   - Click `pin.pin` again: the pin is already pinned, so nothing is logged.

4. **Click** `maximize.hide`, then `maximize.show`.
   - Only the maximize control disappears and comes back. The log shows its own `onhide` and `onshow`; the bar stays visible and sends nothing.

5. **Click** `hide`, then `show`.
   - The bar disappears and comes back. The log shows the bar's `onhide` and `onshow`, each with its `detail`.

6. **Choose** `portrait` for `orientation` in the **States** group.
   - The controls sit one above the other, in the same order.

   The page shows two bars. The second is half as wide as the window and holds a title the page placed in it: its pin stays at the start, its window controls at the end, and the title sits in the centre between them. Narrow the window: the bar stops shrinking once it is as wide as its controls.

7. **Open the Developer Tools**, select the **Console**, and reach a control:

   ```js
   const taskbar = document.querySelector("task-bar");

   taskbar.pin.status;
   taskbar.restore.hide();
   ```

   - `taskbar.pin` is the pin itself, so its `status` reads `pinned` or `unpinned`, and the restore control disappears from the bar.

For more details on **States**, **Controls**, **Operations**, and **Events**, consult the sections below or check the generated **API documentation** (see `npm run document`).

---

## 3. Architectural Overview

### 3.1 Composition

- **Template** (`taskbar.template.html`): Defines DOM structure — a `.bar` surface holding three zones: `.start` with the pin, `.center` with a slot for the host's own content, and `.end` with the minimize, maximize, restore and close controls. Every control carries `appearance="flat"`. Its one style rule, `:host { display: none; }`, keeps the taskbar hidden until its stylesheet applies, so it is never seen unstyled.
- **Style** (`taskbar.style.css`): Encapsulates the surface of the bar, its three zones, the two orientations, and light/dark theme adaptation. The bar is as high as its controls, leaves no space between them, and is never narrower than its controls. Its rule `:host(:defined) { display: inline-block; }` reveals the taskbar; a stylesheet that replaces this one must carry that rule, or the taskbar stays hidden.
- **Class** (`taskbar.ts`): Extends the base component class to handle lifecycle hooks, attribute reflection, the five control members, and the dispatch of its own two events.

### 3.2 Class Lifecycle

- **`connectedCallback()`**
  - Caches the five controls. From here each member returns its control; before, it returns `null`.

- **`disconnectedCallback()`**
  - Nothing to release: the bar listens to nothing.

A host component that holds the bar in its own template reaches the members once the bar is connected, which is after the host's own `connectedCallback`.

---

## 4. Core Concepts: State, Controls, Operations, Events, and Gestures

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

### 4.2 Controls

| Member | Returns | Its package |
|---|---|---|
| `pin` | the `<pin-button>` of the bar | `@scalable.software/pin` |
| `minimize` | the `<minimize-button>` of the bar | `@scalable.software/minimize` |
| `maximize` | the `<maximize-button>` of the bar | `@scalable.software/maximize` |
| `restore` | the `<restore-button>` of the bar | `@scalable.software/restore` |
| `close` | the `<close-button>` of the bar | `@scalable.software/close` |

- Each member is read-only, and `null` until the bar is connected.
- The host works with a control through its own states, operations and events: `taskbar.pin.status`, `taskbar.pin.pin()`, `taskbar.pin.onpin = handler`.
- The host hides a control that does not apply to the window as it is now, such as `taskbar.restore.hide()` while the window is not maximized. The bar stays visible.
- The names are exported as `Control.PIN`, `Control.MINIMIZE`, `Control.MAXIMIZE`, `Control.RESTORE` and `Control.CLOSE`.

### 4.3 Operations

| Operation | What it does |
|---|---|
| `hide()` | hides the bar |
| `show()` | shows the bar |

### 4.4 Events

| Event | Dispatched when | `detail` |
|---|---|---|
| `onhide` | the bar becomes hidden | `{ visibility: "hidden" }` |
| `onshow` | the bar becomes visible | `{ visibility: "visible" }` |

- Subscribe with the property of the same name, such as `taskbar.onhide = handler`, or with `addEventListener("onhide", handler)`. `onevent` receives every event.
- The bar repeats no event of a control. A pin, an unpin or a request is heard on the control itself: `taskbar.pin.onpin`, `taskbar.close.onclose`.
- A control that is hidden or shown on its own does not make the bar dispatch `onhide` or `onshow`.

### 4.5 Gestures

The bar has none: it listens to nothing. Each control handles its own clicks and keys.

---

## 5. Development Workflow

### 5.1 Testing

Unit tests run with Karma + Jasmine. The specification is checked first, then the suite covers composition, states, validation, the controls, operations and events. The suite defines the five controls once, as a host does.

```bash
npm test
```

### 5.2 Documentation (Typedoc)

```bash
npm run document
```

Auto-generates API docs from TypeScript annotations.

### 5.3 Import Maps

The host maps the bar, the base component, and the five controls:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/taskbar": "./node_modules/@scalable.software/taskbar/dist/index.js",
      "@scalable.software/component": "./node_modules/@scalable.software/component/dist/index.js",
      "@scalable.software/pin": "./node_modules/@scalable.software/pin/dist/index.js",
      "@scalable.software/minimize": "./node_modules/@scalable.software/minimize/dist/index.js",
      "@scalable.software/maximize": "./node_modules/@scalable.software/maximize/dist/index.js",
      "@scalable.software/restore": "./node_modules/@scalable.software/restore/dist/index.js",
      "@scalable.software/close": "./node_modules/@scalable.software/close/dist/index.js"
    }
  }
</script>
```

```js
import { Taskbar } from "@scalable.software/taskbar";
import { Pin } from "@scalable.software/pin";
import { Minimize } from "@scalable.software/minimize";
import { Maximize } from "@scalable.software/maximize";
import { Restore } from "@scalable.software/restore";
import { Close } from "@scalable.software/close";

await Pin.Template.load("pin.template.html");
await Minimize.Template.load("minimize.template.html");
await Maximize.Template.load("maximize.template.html");
await Restore.Template.load("restore.template.html");
await Close.Template.load("close.template.html");

[Pin, Minimize, Maximize, Restore, Close].forEach((Control) =>
  customElements.define(Control.Tag, Control)
);

await Taskbar.Template.load("taskbar.template.html");
customElements.define(Taskbar.Tag, Taskbar);
```

Define the controls and load their templates before the bar, so that each control in the bar is complete the moment the bar is connected.

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
