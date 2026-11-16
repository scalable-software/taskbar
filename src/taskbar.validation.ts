/**
 * @module Taskbar
 */

import { Visibility, Orientation } from "./taskbar.meta.js";

/**
 * @category Validation
 */
export class Validate {
  /**
   * Validates that the value is a member of the `Visibility` enum.
   * Throws if the value is not a recognized visibility state.
   * @category Validation
   */
  public static visibility = (value: unknown) => {
    const valid = Object.values(Visibility).includes(value as Visibility);
    if (!valid) {
      throw new Error(`Invalid visibility value: ${value}`);
    }
    return value as Visibility;
  };

  /**
   * Validates that the value is a member of the `Orientation` enum.
   * Throws if the value is not a recognized orientation state.
   * @category Validation
   */
  public static orientation = (value: unknown) => {
    const valid = Object.values(Orientation).includes(value as Orientation);
    if (!valid) {
      throw new Error(`Invalid orientation value: ${value}`);
    }
    return value as Orientation;
  };
}
