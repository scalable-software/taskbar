/**
 * @module Taskbar
 */

// Base Component
import { Component, Template } from "@scalable.software/component";
import { type Configuration } from "@scalable.software/component";

// The controls the taskbar holds in its template: the host defines them, and the
// taskbar finds each by the tag its class gives
import { Pin } from "@scalable.software/pin";

// Taskbar Metadata
import {
  Tag,
  CSS,
  Attributes,
  Visibility,
  Orientation,
  Event
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
   * Cache element references to improve performance
   * @category State
   * @hidden
   */
  protected elements: { start: { pin: Pin | null } } = { start: { pin: null } };

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
    this.elements.start.pin = this.root.querySelector<Pin>(Pin.Tag);
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
  protected _addEventListeners = () => {};

  /**
   * Called by the disconnectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _removeEventListeners = () => {};
}
