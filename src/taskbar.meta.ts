/**
 * @module Taskbar
 */

/**
 * @category Configuration
 */
export const Tag = "task-bar" as const;

/**
 * @category Configuration
 */
export const CSS = "taskbar.style.css" as const;

/**
 * HTML Attributes available to set
 * @category Metadata
 * @enum
 */
export const Attributes = {
  VISIBILITY: "visibility",
  ORIENTATION: "orientation"
} as const;
/**
 * HTML Attributes available to set
 * @category Metadata
 */
export type Attributes = typeof Attributes;

/**
 * HTML Attributes available to set
 * @category Metadata
 * @enum
 */
export const State = {
  ...Attributes
} as const;

/**
 * HTML Attributes available to set
 * @category Metadata
 */
export type State = (typeof State)[keyof typeof State];

/**
 * Indicates whether the component is visible or hidden
 * @category Metadata
 * @enum
 */
export const Visibility = {
  VISIBLE: "visible",
  HIDDEN: "hidden"
} as const;
/**
 * Indicates whether the component is visible or hidden
 * @category Metadata
 */
export type Visibility = (typeof Visibility)[keyof typeof Visibility];

/**
 * Indicates whether the controls are laid out side by side or one above the other
 * @category Metadata
 * @enum
 */
export const Orientation = {
  LANDSCAPE: "landscape",
  PORTRAIT: "portrait"
} as const;
/**
 * Indicates whether the controls are laid out side by side or one above the other
 * @category Metadata
 */
export type Orientation = (typeof Orientation)[keyof typeof Orientation];

/**
 * @category Metadata
 * @enum
 */
export const Operation = {
  HIDE: "hide",
  SHOW: "show",
  PIN: "pin",
  UNPIN: "unpin",
  MINIMIZE: "minimize",
  MAXIMIZE: "maximize",
  RESTORE: "restore",
  CLOSE: "close"
} as const;

/**
 * @category Metadata
 */
export type Operation = (typeof Operation)[keyof typeof Operation];

/**
 * @category Metadata
 * @enum
 */
export const Event = {
  ON_HIDE: "onhide",
  ON_SHOW: "onshow",
  ON_PIN: "onpin",
  ON_UNPIN: "onunpin",
  ON_MINIMIZE: "onminimize",
  ON_MAXIMIZE: "onmaximize",
  ON_RESTORE: "onrestore",
  ON_CLOSE: "onclose"
} as const;
/**
 * @category Metadata
 */
export type Event = (typeof Event)[keyof typeof Event];

/**
 * @category Metadata
 * @enum
 */
export const Gesture = {
  SLOTCHANGE: "slotchange",
  ON_PIN: "onpin",
  ON_UNPIN: "onunpin",
  ON_MINIMIZE: "onminimize",
  ON_MAXIMIZE: "onmaximize",
  ON_RESTORE: "onrestore",
  ON_CLOSE: "onclose"
} as const;
/**
 * @category Metadata
 */
export type Gesture = (typeof Gesture)[keyof typeof Gesture];

/**
 * The appearance the taskbar gives each control placed in it that has one
 * @category Metadata
 * @enum
 */
export const Appearance = {
  FLAT: "flat"
} as const;
/**
 * The appearance the taskbar gives each control placed in it that has one
 * @category Metadata
 */
export type Appearance = (typeof Appearance)[keyof typeof Appearance];

/**
 * Every state the component must have
 * @category Metadata
 */
export type States = Record<State, unknown>;

/**
 * Every operation the component must have
 * @category Metadata
 */
export type Operations = Record<Operation, (...parameters: any[]) => unknown>;

/**
 * Every event the component must have a subscription property for
 * @category Metadata
 */
export type Events = Record<Event, EventListener | null>;

/**
 * Everything the metadata says the component has: implemented by the component
 * @category Metadata
 */
export type Meta = States & Operations & Events;
