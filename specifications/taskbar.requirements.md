# Taskbar — Requirements

## FEATURE: Window Controls

**Benefit** — Product teams get one bar that brings the controls of a window — pin, minimize,
maximize, restore and close — in their usual places, without placing five controls themselves.
The host application reaches each control through the bar: to hear what the end user does
with it, and to work with it when its own code needs to.

**Personas**

- **End user** — the person who sees the bar and uses its controls on the window it belongs to.
- **Host application** — the application, or the panel, that embeds the bar, reaches its
  controls through it, and acts on what they report.

**In scope**

- Bringing the five controls: the pin at the start of the bar, and minimize, maximize,
  restore and close at its end.
- Showing content the host application places in the bar, such as a title, in its centre.
- Letting the host application reach each control through the bar: to hear what it reports,
  to make it act, to read its state, and to hide it while it does not apply.
- Showing the controls as one surface, as high as the controls, without their own borders
  and shadows and without space between them.
- Showing or hiding the bar depending on context.
- Laying the controls out in landscape or in portrait.
- Consistency with the device colour theme.

**Out of scope**

- Actually moving, resizing, hiding or removing the window — the host application does this
  in response to the events of the controls. A panel that embeds the bar removes itself when
  closing is requested; the bar never removes anything.
- Reporting what a control reports as an event of the bar itself — the host application
  listens to each control, through the bar.
- Keeping the condition of the window, such as minimized, maximized or pinned; whether it
  is pinned is held by the pin, and everything else by the host application.
- Deciding which controls apply to the window as it is now — the host application hides and
  shows each control through the bar.
- Deciding whether a pinned window can be moved; the bar only brings the pin.
- Other controls, or another order — the bar brings these five, in these places.
- Listening to the content the host application places in the centre, or changing it — the
  host application does this itself.
- Announcing the bar as a group to assistive technology; each control announces itself.
- Application-level theme switching; the bar follows the device colour scheme only.

---

### STORY: Controls in One Bar

As an **end user**, when I work in a window, I want its controls together in one bar, so that
I always find them in the same place.

### STORY: Built-in Controls

As a **host application**, when I give a window its bar, I want the bar to bring the window's
controls itself and to let me reach each of them through it, so that I place one bar and hold
nothing else.

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
