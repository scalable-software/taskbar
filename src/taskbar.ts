/**
 * @module Taskbar
 */

// Base Component
import { Component, Template } from "@scalable.software/component";
import { type Configuration } from "@scalable.software/component";

// Taskbar Metadata
import {
  Tag,
  CSS,
  Attributes,
  Visibility,
  Orientation,
  Event,
  Operation,
  Gesture,
  Appearance
} from "./taskbar.meta.js";

import { type Meta } from "./taskbar.meta.js";

// Validation
import { Validate } from "./taskbar.validation.js";

/**
 * Optional Configuration: required for taskbars with custom layout and style
 * @category Configuration
 */
export const configuration: Configuration = {
  url: import.meta.url,
  template: {
    id: Tag
  },
  css: {
    name: CSS
  }
} as const;

/**
 * A control placed in the taskbar: any element. It may offer the operations the taskbar
 * passes on, and it may have an appearance.
 * @category Configuration
 */
type Control = Element &
  Partial<Record<Operation, () => unknown>> & { appearance?: string };

/**
 * @category Taskbar
 */
export class Taskbar extends Component implements Meta {
  /**
   * The tag name of the taskbar
   * @category Configuration
   */
  public static get Tag() {
    return Tag;
  }

  /**
   * Only attributes defined the Attributes object will be observed in DOM
   * @category State
   */
  public static get Attributes(): Attributes {
    return Attributes;
  }

  /**
   * Helper function to load the taskbar template into DOM
   * @category Utility
   */
  public static Template = new Template(import.meta.url);

  /**
   * Internal Visibility state of the component
   * @category State
   * @default Visibility.VISIBLE
   * @hidden
   */
  private _visibility: Visibility = Visibility.VISIBLE;

  /**
   * Internal Orientation state of the component
   * @category State
   * @default Orientation.LANDSCAPE
   * @hidden
   */
  private _orientation: Orientation = Orientation.LANDSCAPE;

  /**
   * onhide triggered when taskbar visibility changes to hidden
   * @category Events
   * @hidden
   */
  private _onhide: EventListener | null = null;

  /**
   * onshow triggered when taskbar visibility changes to visible
   * @category Events
   * @hidden
   */
  private _onshow: EventListener | null = null;

  /**
   * onpin triggered when a pin placed in the taskbar is pinned
   * @category Events
   * @hidden
   */
  private _onpin: EventListener | null = null;

  /**
   * onunpin triggered when a pin placed in the taskbar is unpinned
   * @category Events
   * @hidden
   */
  private _onunpin: EventListener | null = null;

  /**
   * onminimize triggered when a control placed in the taskbar requests minimizing
   * @category Events
   * @hidden
   */
  private _onminimize: EventListener | null = null;

  /**
   * onmaximize triggered when a control placed in the taskbar requests maximizing
   * @category Events
   * @hidden
   */
  private _onmaximize: EventListener | null = null;

  /**
   * onrestore triggered when a control placed in the taskbar requests restoring
   * @category Events
   * @hidden
   */
  private _onrestore: EventListener | null = null;

  /**
   * onclose triggered when a control placed in the taskbar requests closing
   * @category Events
   * @hidden
   */
  private _onclose: EventListener | null = null;

  /**
   * The controls the taskbar listens to
   * @category Gesture
   * @hidden
   */
  private _controls: Control[] = [];

  /**
   * Cache element references to improve performance
   * @category State
   * @hidden
   */
  protected elements: { controls: HTMLSlotElement | null } = {
    controls: null
  };

  /**
   * @hidden
   */
  constructor() {
    super(configuration);
  }

  /**
   * Get and set the visibility of the taskbar
   * @category State
   */
  public get visibility(): Visibility {
    return this._visibility;
  }
  public set visibility(visibility: Visibility | null) {
    try {
      // Normalize
      visibility = visibility ?? Visibility.VISIBLE;

      // Validate
      visibility = Validate.visibility(visibility);

      // Guard
      if (this._visibility === visibility) return;

      // Mutate
      this._visibility = visibility;
    } finally {
      // Reflect
      this._reflect(
        Attributes.VISIBILITY,
        this._visibility,
        Visibility.VISIBLE
      );
    }

    // Dispatch
    const detail = { visibility };
    visibility === Visibility.HIDDEN && this._dispatch(Event.ON_HIDE, detail);
    visibility === Visibility.VISIBLE && this._dispatch(Event.ON_SHOW, detail);
  }

  /**
   * Get and set the orientation of the taskbar
   * @category State
   */
  public get orientation(): Orientation {
    return this._orientation;
  }
  public set orientation(orientation: Orientation | null) {
    try {
      // Normalize
      orientation = orientation ?? Orientation.LANDSCAPE;

      // Validate
      orientation = Validate.orientation(orientation);

      // Mutate
      this._orientation = orientation;
    } finally {
      // Reflect
      this._reflect(
        Attributes.ORIENTATION,
        this._orientation,
        Orientation.LANDSCAPE
      );
    }
  }

  /**
   * Triggered via `.hide()`
   * @event
   * @category Events
   */
  public set onhide(handler: EventListener | null) {
    this._onhide = this._subscribe(Event.ON_HIDE, this._onhide, handler);
  }

  /**
   * Triggered via `.show()`
   * @event
   * @category Events
   */
  public set onshow(handler: EventListener | null) {
    this._onshow = this._subscribe(Event.ON_SHOW, this._onshow, handler);
  }

  /**
   * Triggered when a pin placed in the taskbar is pinned
   * @event
   * @category Events
   */
  public set onpin(handler: EventListener | null) {
    this._onpin = this._subscribe(Event.ON_PIN, this._onpin, handler);
  }

  /**
   * Triggered when a pin placed in the taskbar is unpinned
   * @event
   * @category Events
   */
  public set onunpin(handler: EventListener | null) {
    this._onunpin = this._subscribe(Event.ON_UNPIN, this._onunpin, handler);
  }

  /**
   * Triggered when a control placed in the taskbar requests minimizing
   * @event
   * @category Events
   */
  public set onminimize(handler: EventListener | null) {
    this._onminimize = this._subscribe(
      Event.ON_MINIMIZE,
      this._onminimize,
      handler
    );
  }

  /**
   * Triggered when a control placed in the taskbar requests maximizing
   * @event
   * @category Events
   */
  public set onmaximize(handler: EventListener | null) {
    this._onmaximize = this._subscribe(
      Event.ON_MAXIMIZE,
      this._onmaximize,
      handler
    );
  }

  /**
   * Triggered when a control placed in the taskbar requests restoring
   * @event
   * @category Events
   */
  public set onrestore(handler: EventListener | null) {
    this._onrestore = this._subscribe(
      Event.ON_RESTORE,
      this._onrestore,
      handler
    );
  }

  /**
   * Triggered when a control placed in the taskbar requests closing
   * @event
   * @category Events
   */
  public set onclose(handler: EventListener | null) {
    this._onclose = this._subscribe(Event.ON_CLOSE, this._onclose, handler);
  }

  /**
   * Hide the taskbar when it is visible
   * @category Operations
   */
  public hide = () => {
    this.visibility = Visibility.HIDDEN;
  };

  /**
   * Show the taskbar when it is hidden
   * @category Operations
   */
  public show = () => {
    this.visibility = Visibility.VISIBLE;
  };

  /**
   * Ask each control placed in the taskbar that offers `pin` to pin
   * @category Operations
   */
  public pin = () => {
    this._ask(Operation.PIN);
  };

  /**
   * Ask each control placed in the taskbar that offers `unpin` to unpin
   * @category Operations
   */
  public unpin = () => {
    this._ask(Operation.UNPIN);
  };

  /**
   * Ask each control placed in the taskbar that offers `minimize` to request minimizing
   * @category Operations
   */
  public minimize = () => {
    this._ask(Operation.MINIMIZE);
  };

  /**
   * Ask each control placed in the taskbar that offers `maximize` to request maximizing
   * @category Operations
   */
  public maximize = () => {
    this._ask(Operation.MAXIMIZE);
  };

  /**
   * Ask each control placed in the taskbar that offers `restore` to request restoring
   * @category Operations
   */
  public restore = () => {
    this._ask(Operation.RESTORE);
  };

  /**
   * Ask each control placed in the taskbar that offers `close` to request closing: the taskbar removes nothing
   * @category Operations
   */
  public close = () => {
    this._ask(Operation.CLOSE);
  };

  /**
   * List operations to perform for selected attributes being observed in the DOM.
   * @category Configuration
   * @hidden
   */
  protected _attributeHandlers = {
    [Attributes.VISIBILITY]: (value: Visibility | null) =>
      (this.visibility = value),
    [Attributes.ORIENTATION]: (value: Orientation | null) =>
      (this.orientation = value)
  };

  /**
   * Cache element references to improve performance
   * @category Configuration
   * @hidden
   */
  protected _cache = () => {
    this.elements.controls = this.root.querySelector(".controls");
  };

  /**
   * Initialize taskbar attributes with default values
   * @category Configuration
   * @hidden
   */
  protected _initialize = () => {};

  /**
   * Called by the connectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _addEventListeners = () => {
    this.elements.controls?.addEventListener(
      Gesture.SLOTCHANGE,
      this._handleControlsSlotchangeListen
    );
    this.elements.controls?.addEventListener(
      Gesture.SLOTCHANGE,
      this._handleControlsSlotchangeFlatten
    );
    this._listen();
  };

  /**
   * Called by the disconnectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _removeEventListeners = () => {
    this.elements.controls?.removeEventListener(
      Gesture.SLOTCHANGE,
      this._handleControlsSlotchangeListen
    );
    this.elements.controls?.removeEventListener(
      Gesture.SLOTCHANGE,
      this._handleControlsSlotchangeFlatten
    );
    this._ignore();
  };

  /**
   * The controls placed in the taskbar: none until the taskbar is connected
   * @category Operations
   * @hidden
   */
  private _placed = () =>
    (this.elements.controls?.assignedElements() ?? []) as Control[];

  /**
   * Ask each control placed in the taskbar that offers the operation to carry it out
   * @category Operations
   * @hidden
   */
  private _ask = (operation: Operation) => {
    this._placed().forEach((control) => {
      const act = control[operation];
      typeof act === "function" && act.call(control);
    });
  };

  /**
   * Listen to every control placed in the taskbar: reached only through a gesture
   * @category Operations
   * @hidden
   */
  private _listen = () => {
    this._ignore();
    this._controls = this._placed();
    this._controls.forEach((control) => {
      control.addEventListener(Gesture.ON_PIN, this._handleControlsOnpin);
      control.addEventListener(Gesture.ON_UNPIN, this._handleControlsOnunpin);
      control.addEventListener(
        Gesture.ON_MINIMIZE,
        this._handleControlsOnminimize
      );
      control.addEventListener(
        Gesture.ON_MAXIMIZE,
        this._handleControlsOnmaximize
      );
      control.addEventListener(
        Gesture.ON_RESTORE,
        this._handleControlsOnrestore
      );
      control.addEventListener(Gesture.ON_CLOSE, this._handleControlsOnclose);
    });
  };

  /**
   * Stop listening to every control the taskbar listens to: reached only through a gesture
   * @category Operations
   * @hidden
   */
  private _ignore = () => {
    this._controls.forEach((control) => {
      control.removeEventListener(Gesture.ON_PIN, this._handleControlsOnpin);
      control.removeEventListener(
        Gesture.ON_UNPIN,
        this._handleControlsOnunpin
      );
      control.removeEventListener(
        Gesture.ON_MINIMIZE,
        this._handleControlsOnminimize
      );
      control.removeEventListener(
        Gesture.ON_MAXIMIZE,
        this._handleControlsOnmaximize
      );
      control.removeEventListener(
        Gesture.ON_RESTORE,
        this._handleControlsOnrestore
      );
      control.removeEventListener(
        Gesture.ON_CLOSE,
        this._handleControlsOnclose
      );
    });
    this._controls = [];
  };

  /**
   * Make every control placed in the taskbar that has an appearance flat: reached only
   * through a gesture
   * @category Operations
   * @hidden
   */
  private _flatten = () => {
    this._placed().forEach(
      (control) =>
        control.appearance !== undefined &&
        (control.appearance = Appearance.FLAT)
    );
  };

  /**
   * Report what a control placed in the taskbar reported, as the taskbar's own event:
   * reached only through a gesture
   * @category Operations
   * @hidden
   */
  private _report = (event: Event, detail?: unknown) => {
    this._dispatch(event, detail);
  };

  /**
   * Handles a control being placed in the taskbar or taken out: listens to the controls
   * @category Gesture
   * @hidden
   */
  private _handleControlsSlotchangeListen = () => this._listen();

  /**
   * Handles a control being placed in the taskbar or taken out: makes the controls flat
   * @category Gesture
   * @hidden
   */
  private _handleControlsSlotchangeFlatten = () => this._flatten();

  /**
   * Handles a pin placed in the taskbar reporting that it was pinned: reports it,
   * with the status the pin gave
   * @category Gesture
   * @hidden
   */
  private _handleControlsOnpin = (event: globalThis.Event) =>
    this._report(Event.ON_PIN, (event as CustomEvent).detail);

  /**
   * Handles a pin placed in the taskbar reporting that it was unpinned: reports it,
   * with the status the pin gave
   * @category Gesture
   * @hidden
   */
  private _handleControlsOnunpin = (event: globalThis.Event) =>
    this._report(Event.ON_UNPIN, (event as CustomEvent).detail);

  /**
   * Handles a control placed in the taskbar reporting that minimizing is requested:
   * reports it
   * @category Gesture
   * @hidden
   */
  private _handleControlsOnminimize = () => this._report(Event.ON_MINIMIZE);

  /**
   * Handles a control placed in the taskbar reporting that maximizing is requested:
   * reports it
   * @category Gesture
   * @hidden
   */
  private _handleControlsOnmaximize = () => this._report(Event.ON_MAXIMIZE);

  /**
   * Handles a control placed in the taskbar reporting that restoring is requested:
   * reports it
   * @category Gesture
   * @hidden
   */
  private _handleControlsOnrestore = () => this._report(Event.ON_RESTORE);

  /**
   * Handles a control placed in the taskbar reporting that closing is requested:
   * reports it
   * @category Gesture
   * @hidden
   */
  private _handleControlsOnclose = () => this._report(Event.ON_CLOSE);
}
