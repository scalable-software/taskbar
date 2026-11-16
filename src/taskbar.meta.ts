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
  SHOW: "show"
} as const;

/**
 * @category Metadata
 */
export type Operation = (typeof Operation)[keyof typeof Operation];

/**
 * @category Metadata
 * @enum
 */
export const Event = {} as const;
/**
 * @category Metadata
 */
export type Event = (typeof Event)[keyof typeof Event];

/**
 * @category Metadata
 * @enum
 */
export const Gesture = {} as const;
/**
 * @category Metadata
 */
export type Gesture = (typeof Gesture)[keyof typeof Gesture];

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
 * Everything the metadata says the component has: implemented by the component
 * @category Metadata
 */
export type Meta = States & Operations;
