import {
  Tag,
  Attributes,
  State,
  Visibility,
  Orientation,
  Operation,
  Event,
  Gesture,
  Appearance
} from "@scalable.software/taskbar";

// Tag
metadata(Metadata.TAG, () => {
  when("Tag imported", () => {
    then("Tag is defined", () => {
      expect(Tag).toBeDefined();
    });

    then("Tag is `task-bar`", () => {
      expect(Tag).toBe("task-bar");
    });
  });
});

// Attributes
metadata(Metadata.ATTRIBUTES, () => {
  and("Attribute imported", () => {
    then("Attributes is defined", () => {
      expect(Attributes).toBeDefined();
    });

    and("Attributes is defined", () => {
      then("Attributes is an object", () => {
        expect(typeof Attributes).toBe("object");
      });

      when("Attributes is an object", () => {
        then("`Attributes.VISIBILITY` exists", () => {
          expect(Attributes.VISIBILITY).toBeDefined();
        });

        then("`Attributes.VISIBILITY` is `visibility`", () => {
          expect(Attributes.VISIBILITY).toBe("visibility");
        });

        then("`Attributes.ORIENTATION` exists", () => {
          expect(Attributes.ORIENTATION).toBeDefined();
        });

        then("`Attributes.ORIENTATION` is `orientation`", () => {
          expect(Attributes.ORIENTATION).toBe("orientation");
        });
      });
    });
  });
});

// State
metadata(Metadata.STATE, () => {
  and("State imported", () => {
    then("State is defined", () => {
      expect(State).toBeDefined();
    });

    and("State is defined", () => {
      then("State is an object", () => {
        expect(typeof State).toBe("object");
      });

      when("State is an object", () => {
        then("`State.VISIBILITY` exists", () => {
          expect(State.VISIBILITY).toBeDefined();
        });

        then("`State.VISIBILITY` is `visibility`", () => {
          expect(State.VISIBILITY).toBe("visibility");
        });

        then("`State.ORIENTATION` exists", () => {
          expect(State.ORIENTATION).toBeDefined();
        });

        then("`State.ORIENTATION` is `orientation`", () => {
          expect(State.ORIENTATION).toBe("orientation");
        });
      });
    });
  });
});

metadata(State.VISIBILITY, () => {
  and("Visibility imported", () => {
    then("Visibility is defined", () => {
      expect(Visibility).toBeDefined();
    });

    and("Visibility is defined", () => {
      then("Visibility is an object", () => {
        expect(typeof Visibility).toBe("object");
      });

      when("Visibility is an object", () => {
        then("`Visibility.VISIBLE` exists", () => {
          expect(Visibility.VISIBLE).toBeDefined();
        });

        then("`Visibility.VISIBLE` is `visible`", () => {
          expect(Visibility.VISIBLE).toBe("visible");
        });

        then("`Visibility.HIDDEN` exists", () => {
          expect(Visibility.HIDDEN).toBeDefined();
        });

        then("`Visibility.HIDDEN` is `hidden`", () => {
          expect(Visibility.HIDDEN).toBe("hidden");
        });
      });
    });
  });
});

metadata(State.ORIENTATION, () => {
  and("Orientation imported", () => {
    then("Orientation is defined", () => {
      expect(Orientation).toBeDefined();
    });

    and("Orientation is defined", () => {
      then("Orientation is an object", () => {
        expect(typeof Orientation).toBe("object");
      });

      when("Orientation is an object", () => {
        then("`Orientation.LANDSCAPE` exists", () => {
          expect(Orientation.LANDSCAPE).toBeDefined();
        });

        then("`Orientation.LANDSCAPE` is `landscape`", () => {
          expect(Orientation.LANDSCAPE).toBe("landscape");
        });

        then("`Orientation.PORTRAIT` exists", () => {
          expect(Orientation.PORTRAIT).toBeDefined();
        });

        then("`Orientation.PORTRAIT` is `portrait`", () => {
          expect(Orientation.PORTRAIT).toBe("portrait");
        });
      });
    });
  });
});

// Operation
metadata(Metadata.OPERATION, () => {
  and("Operation imported", () => {
    then("Operation is defined", () => {
      expect(Operation).toBeDefined();
    });

    and("Operation is defined", () => {
      then("Operation is an object", () => {
        expect(typeof Operation).toBe("object");
      });

      when("Operation is an object", () => {
        then("`Operation` holds `hide` and `show` only", () => {
          expect(Object.values(Operation)).toEqual(["hide", "show"]);
        });

        then("no operation name is taken by the platform", () => {
          const taken = Object.values(Operation).filter(
            (name) => name in HTMLElement.prototype
          );
          expect(taken).toEqual([]);
        });

        then("`Operation.HIDE` exists", () => {
          expect(Operation.HIDE).toBeDefined();
        });

        then("`Operation.HIDE` is `hide`", () => {
          expect(Operation.HIDE).toBe("hide");
        });

        then("`Operation.SHOW` exists", () => {
          expect(Operation.SHOW).toBeDefined();
        });

        then("`Operation.SHOW` is `show`", () => {
          expect(Operation.SHOW).toBe("show");
        });
      });
    });
  });
});

// Event
metadata(Metadata.EVENT, () => {
  and("Event imported", () => {
    then("Event is defined", () => {
      expect(Event).toBeDefined();
    });

    and("Event is defined", () => {
      then("Event is an object", () => {
        expect(typeof Event).toBe("object");
      });

      when("Event is an object", () => {
        then("`Event` holds `onhide` and `onshow` only", () => {
          expect(Object.values(Event)).toEqual(["onhide", "onshow"]);
        });

        then("no event name is taken by the platform", () => {
          const taken = Object.values(Event).filter(
            (name) => name in HTMLElement.prototype
          );
          expect(taken).toEqual([]);
        });

        then("`Event.ON_HIDE` exists", () => {
          expect(Event.ON_HIDE).toBeDefined();
        });

        then("`Event.ON_HIDE` is `onhide`", () => {
          expect(Event.ON_HIDE).toBe("onhide");
        });

        then("`Event.ON_SHOW` exists", () => {
          expect(Event.ON_SHOW).toBeDefined();
        });

        then("`Event.ON_SHOW` is `onshow`", () => {
          expect(Event.ON_SHOW).toBe("onshow");
        });
      });
    });
  });
});

// Gesture
metadata(Metadata.GESTURE, () => {
  and("Gesture imported", () => {
    then("Gesture is defined", () => {
      expect(Gesture).toBeDefined();
    });

    and("Gesture is defined", () => {
      then("Gesture is an object", () => {
        expect(typeof Gesture).toBe("object");
      });

      when("Gesture is an object", () => {
        then("`Gesture.SLOTCHANGE` exists", () => {
          expect(Gesture.SLOTCHANGE).toBeDefined();
        });

        then("`Gesture.SLOTCHANGE` is `slotchange`", () => {
          expect(Gesture.SLOTCHANGE).toBe("slotchange");
        });

        then("`Gesture.ON_PIN` exists", () => {
          expect(Gesture.ON_PIN).toBeDefined();
        });

        then("`Gesture.ON_PIN` is `onpin`", () => {
          expect(Gesture.ON_PIN).toBe("onpin");
        });

        then("`Gesture.ON_UNPIN` exists", () => {
          expect(Gesture.ON_UNPIN).toBeDefined();
        });

        then("`Gesture.ON_UNPIN` is `onunpin`", () => {
          expect(Gesture.ON_UNPIN).toBe("onunpin");
        });

        then("`Gesture.ON_MINIMIZE` exists", () => {
          expect(Gesture.ON_MINIMIZE).toBeDefined();
        });

        then("`Gesture.ON_MINIMIZE` is `onminimize`", () => {
          expect(Gesture.ON_MINIMIZE).toBe("onminimize");
        });

        then("`Gesture.ON_MAXIMIZE` exists", () => {
          expect(Gesture.ON_MAXIMIZE).toBeDefined();
        });

        then("`Gesture.ON_MAXIMIZE` is `onmaximize`", () => {
          expect(Gesture.ON_MAXIMIZE).toBe("onmaximize");
        });

        then("`Gesture.ON_RESTORE` exists", () => {
          expect(Gesture.ON_RESTORE).toBeDefined();
        });

        then("`Gesture.ON_RESTORE` is `onrestore`", () => {
          expect(Gesture.ON_RESTORE).toBe("onrestore");
        });

        then("`Gesture.ON_CLOSE` exists", () => {
          expect(Gesture.ON_CLOSE).toBeDefined();
        });

        then("`Gesture.ON_CLOSE` is `onclose`", () => {
          expect(Gesture.ON_CLOSE).toBe("onclose");
        });
      });
    });
  });
});

metadata(Metadata.APPEARANCE, () => {
  and("Appearance imported", () => {
    then("Appearance is defined", () => {
      expect(Appearance).toBeDefined();
    });

    and("Appearance is defined", () => {
      then("Appearance is an object", () => {
        expect(typeof Appearance).toBe("object");
      });

      when("Appearance is an object", () => {
        then("`Appearance.FLAT` exists", () => {
          expect(Appearance.FLAT).toBeDefined();
        });

        then("`Appearance.FLAT` is `flat`", () => {
          expect(Appearance.FLAT).toBe("flat");
        });
      });
    });
  });
});
