import {
  Tag,
  Attributes,
  State,
  Visibility,
  Orientation,
  Operation,
  Event,
  Gesture
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

        then("`Operation.PIN` exists", () => {
          expect(Operation.PIN).toBeDefined();
        });

        then("`Operation.PIN` is `pin`", () => {
          expect(Operation.PIN).toBe("pin");
        });

        then("`Operation.UNPIN` exists", () => {
          expect(Operation.UNPIN).toBeDefined();
        });

        then("`Operation.UNPIN` is `unpin`", () => {
          expect(Operation.UNPIN).toBe("unpin");
        });

        then("`Operation.MINIMIZE` exists", () => {
          expect(Operation.MINIMIZE).toBeDefined();
        });

        then("`Operation.MINIMIZE` is `minimize`", () => {
          expect(Operation.MINIMIZE).toBe("minimize");
        });

        then("`Operation.MAXIMIZE` exists", () => {
          expect(Operation.MAXIMIZE).toBeDefined();
        });

        then("`Operation.MAXIMIZE` is `maximize`", () => {
          expect(Operation.MAXIMIZE).toBe("maximize");
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

    when("Gesture is defined", () => {
      then("Gesture is an object", () => {
        expect(typeof Gesture).toBe("object");
      });
    });
  });
});
