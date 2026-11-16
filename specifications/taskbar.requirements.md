# Taskbar — Requirements

## FEATURE: Window Controls

**Benefit** — Product teams get one bar that holds the controls of a window — pin, minimize,
maximize, restore and close — and reports what the end user does with them in one place,
without placing and wiring five controls themselves.

**Personas**

- **End user** — the person who sees the bar and uses its controls on the window it belongs to.
- **Host application** — the application, or the panel, that embeds the bar and acts on what
  it reports.

**In scope**

- Holding the five controls in one bar, in a fixed order.
- Reporting every pin, unpin and request of a control as an event of the bar itself.
- Showing or hiding the bar depending on context.
- Laying the controls out in landscape or in portrait.
- Consistency with the device colour theme.

**Out of scope**

- Actually moving, resizing, hiding or removing the window — the host application does this
  in response to the bar's events. A panel that embeds the bar removes itself when closing is
  requested; the bar never removes anything.
- Keeping the condition of the window, such as minimized or maximized.
- Deciding whether a pinned window can be moved; the bar only reports the pin.
- A title, a menu or any content other than the five controls.
- Application-level theme switching; the bar follows the device colour scheme only.

---

### STORY: Window Controls in One Place

As an **end user**, when I work in a window, I want its pin, minimize, maximize, restore and
close controls together in one bar, so that I always find them in the same place.

As a **host application**, I want to be told by the bar each time the end user pins, unpins,
or asks to minimize, maximize, restore or close, so that I listen in one place instead of to
five controls.

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
