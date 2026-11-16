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
  Orientation
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
  }

  /**
   * Get the orientation of the taskbar
   * @category State
   */
  public get orientation(): Orientation {
    return this._orientation;
  }

  /**
   * List operations to perform for selected attributes being observed in the DOM.
   * @category Configuration
   * @hidden
   */
  protected _attributeHandlers = {
    [Attributes.VISIBILITY]: (value: Visibility | null) =>
      (this.visibility = value)
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
  protected _addEventListeners = () => {};

  /**
   * Called by the disconnectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _removeEventListeners = () => {};
}
