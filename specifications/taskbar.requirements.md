# Taskbar — Requirements

## FEATURE: Window Controls

**Benefit** — Product teams get one bar that holds the controls of a window — such as pin,
minimize, maximize, restore and close — and reports what the end user does with them in one
place. The host application decides which controls the bar holds, and asks the bar when its
own code needs a control to act, without laying them out and wiring each of them itself.

**Personas**

- **End user** — the person who sees the bar and uses its controls on the window it belongs to.
- **Host application** — the application, or the panel, that embeds the bar, places its
  controls in it, and acts on what it reports.

**In scope**

- Holding the controls the host application places in the bar, in the order they were placed.
- Reporting every pin, unpin and request of a control as an event of the bar itself.
- Passing a request of the host application on to the control that carries it out.
- Showing the controls as one surface, without their own borders and shadows.
- Showing or hiding the bar depending on context.
- Laying the controls out in landscape or in portrait.
- Consistency with the device colour theme.

**Out of scope**

- Actually moving, resizing, hiding or removing the window — the host application does this
  in response to the bar's events. A panel that embeds the bar removes itself when closing is
  requested; the bar never removes anything.
- Keeping the condition of the window, such as minimized, maximized or pinned; whether it
  is pinned is held by the pin, and everything else by the host application.
- Deciding whether a pinned window can be moved; the bar only reports the pin.
- Providing the controls — the host application places the ones its window offers.
- Showing or hiding a single control — the host application does this on the control it
  placed.
- Reporting what any other component placed in the bar does — the host application listens
  to that component itself.
- Announcing the bar as a group to assistive technology; each control announces itself.
- Application-level theme switching; the bar follows the device colour scheme only.

---

### STORY: Controls in One Bar

As an **end user**, when I work in a window, I want its controls together in one bar, so that
I always find them in the same place.

As a **host application**, I want to decide which controls the bar holds and in which order,
so that the bar shows only the controls my window offers.

### STORY: One Place to Listen

As a **host application**, I want to be told by the bar each time the end user pins, unpins,
or asks to minimize, maximize, restore or close, so that I listen in one place instead of to
each control.

### STORY: One Place to Ask

As a **host application**, when my own code needs a control to act, I want to ask the bar to
pin, unpin, minimize, maximize, restore or close, so that I work with the bar and not with
each control inside it.

### STORY: Flat Controls

As an **end user**, I want the controls in the bar to appear without their own borders and
shadows, so that the bar reads as one surface.

### STORY: Visibility Control

As a **host application**, when the window controls are not relevant to the current context,
I want to hide the bar and show it again later, so that the end user only sees controls that
apply.

### STORY: Orientation

As a **host application**, when the bar sits along the side of a window instead of along its
top, I want to lay its controls out in portrait, so that the bar fits the edge it is placed on.

### STORY: Theme Compatibility

As an **end user**, I want the bar to match my device's light or dark colour scheme, so that
it looks consistent with the rest of my interface.
