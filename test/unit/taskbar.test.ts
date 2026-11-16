import { Template } from "@scalable.software/component";

import {
  Taskbar,
  Tag,
  CSS,
  Attributes,
  State,
  Visibility
} from "@scalable.software/taskbar";

// Configuration
configuration(Configuration.TAG, () => {
  and("Taskbar imported", () => {
    then("Taskbar is defined", () => {
      expect(Taskbar).toBeDefined();
    });

    and("Taskbar is defined", () => {
      then("Taskbar.Tag static getter is defined", () => {
        expect(Taskbar.Tag).toBeDefined();
      });

      and("Taskbar.Tag static getter is defined", () => {
        then("Taskbar.Tag is Tag", () => {
          expect(Taskbar.Tag).toBe(Tag);
        });
      });
    });
  });
});

configuration(Configuration.ATTRIBUTES, () => {
  and("Taskbar imported", () => {
    then("Taskbar is defined", () => {
      expect(Taskbar).toBeDefined();
    });

    and("Taskbar is defined", () => {
      then("Taskbar.Attributes static getter is defined", () => {
        expect(Taskbar.Attributes).toBeDefined();
      });

      and("Taskbar.Attributes static getter is defined", () => {
        then("Taskbar.Attributes is Attributes", () => {
          expect(Taskbar.Attributes).toBe(Attributes);
        });
      });
    });
  });
});

// Utilities
utility(Utilities.TEMPLATE, () => {
  then("Taskbar.Template static property is defined", () => {
    expect(Taskbar.Template).toBeDefined();
  });

  and("Taskbar.Template static property is defined", () => {
    then("Taskbar.Template is a Template", () => {
      expect(Taskbar.Template).toBeInstanceOf(Template);
    });
  });
});

// Compositions
composition(Composition.TEMPLATE, () => {
  given("Taskbar is defined in custom element registry", () => {
    beforeEach(() => {
      define(Taskbar.Tag, Taskbar);
    });

    and("HTML Template is added to DOM", () => {
      let template: HTMLTemplateElement;
      beforeEach(async () => {
        template = (await Taskbar.Template.load(
          "taskbar.template.html"
        )) as HTMLTemplateElement;
      });
      afterEach(() => {
        remove(Taskbar.Tag);
      });

      then("template is defined", () => {
        expect(template).toBeDefined();
      });

      and("a new taskbar is added to DOM", () => {
        let taskbar: Taskbar;
        beforeEach(() => {
          taskbar = add<Taskbar>(Taskbar.Tag);
        });
        afterEach(() => {
          taskbar.remove();
        });

        then("taskbar.root contents contains template contents", () => {
          expect(taskbar.root.innerHTML).toContain(template.innerHTML);
        });

        and("`taskbar.root` contents contains template contents", () => {
          then("`taskbar.root` contains `div.bar`", () => {
            const div = taskbar.root.querySelector("div.bar");
            expect(div).not.toBeNull();
          });

          when("`taskbar.root` contains `div.bar`", () => {
            let div: HTMLDivElement;
            beforeEach(() => {
              div = taskbar.root.querySelector("div.bar") as HTMLDivElement;
            });

            then("`div.bar` contains `slot.controls`", () => {
              const slot = div.querySelector("slot.controls");
              expect(slot).not.toBeNull();
            });
          });
        });
      });
    });
  });
});

composition(Composition.CSS, () => {
  given("Taskbar is defined in custom element registry", () => {
    beforeEach(() => {
      define(Taskbar.Tag, Taskbar);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Taskbar.Template.load("taskbar.template.html");
      });
      afterEach(() => {
        remove(Taskbar.Tag);
      });

      and("a new taskbar is added to DOM", () => {
        let taskbar: Taskbar;
        beforeEach(() => {
          taskbar = add<Taskbar>(Taskbar.Tag);
        });
        afterEach(() => {
          taskbar.remove();
        });

        then("taskbar.root contents contains a link to stylesheet", () => {
          expect(taskbar.root.innerHTML).toContain("stylesheet");
        });

        and("taskbar.root contents contains a link to stylesheet", () => {
          then("the stylesheet file's name is correct", () => {
            expect(taskbar.root.innerHTML).toContain(CSS);
          });
        });
      });
    });
  });
});

composition(Composition.ELEMENT, () => {
  and("Taskbar is defined in custom element registry", () => {
    beforeEach(() => {
      define(Taskbar.Tag, Taskbar);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Taskbar.Template.load("taskbar.template.html");
      });
      afterEach(() => {
        remove(Taskbar.Tag);
      });

      and("a new taskbar is added to DOM", () => {
        let taskbar: Taskbar;
        beforeEach(() => {
          taskbar = add<Taskbar>(Taskbar.Tag);
        });
        afterEach(() => {
          taskbar.remove();
        });

        then("`taskbar.elements.controls` is defined", () => {
          expect(taskbar["elements"].controls).toBeDefined();
        });

        when("`taskbar.elements.controls` is defined", () => {
          then(
            "`taskbar.elements.controls` is a cached reference to the `slot` with class `controls`",
            () => {
              const controls = taskbar.root.querySelector(
                ".controls"
              ) as HTMLSlotElement;
              expect(taskbar["elements"].controls).toBe(controls);
            }
          );
        });
      });
    });
  });
});

// State
state(State.VISIBILITY, () => {
  given("Taskbar is defined in custom element registry", () => {
    beforeEach(() => {
      define(Taskbar.Tag, Taskbar);
    });

    and("a HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Taskbar.Template.load("taskbar.template.html");
      });
      afterEach(() => {
        remove(Taskbar.Tag);
      });

      and("a new taskbar is added to DOM", () => {
        let taskbar: Taskbar;
        beforeEach(() => {
          taskbar = add<Taskbar>(Taskbar.Tag);
        });
        afterEach(() => {
          taskbar.remove();
        });

        then("`taskbar.visibility` getter exists", () => {
          expect(taskbar.visibility).toBeDefined();
        });

        when("`taskbar.visibility` getter exists", () => {
          then("`taskbar.visibility` is `Visibility.VISIBLE`", () => {
            expect(taskbar.visibility).toBe(Visibility.VISIBLE);
          });
        });

        then("`visibility` attribute does not exist", () => {
          expect(taskbar.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
        });
      });
    });
  });
});

// Operation

// Event

// Gesture
