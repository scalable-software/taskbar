import { Template } from "@scalable.software/component";

import {
  Taskbar,
  Tag,
  CSS,
  Attributes,
  State,
  Visibility,
  Orientation,
  Control,
  Operation,
  Event
} from "@scalable.software/taskbar";
import { Pin, Status, Appearance } from "@scalable.software/pin";
import { Minimize } from "@scalable.software/minimize";
import { Maximize } from "@scalable.software/maximize";
import { Restore } from "@scalable.software/restore";
import { Close } from "@scalable.software/close";

// As the host does: the templates of the controls are loaded and the controls are
// defined once, and both stay for every suite
beforeAll(async () => {
  await Pin.Template.load("pin.template.html");
  await Minimize.Template.load("minimize.template.html");
  await Maximize.Template.load("maximize.template.html");
  await Restore.Template.load("restore.template.html");
  await Close.Template.load("close.template.html");
  define(Pin.Tag, Pin);
  define(Minimize.Tag, Minimize);
  define(Maximize.Tag, Maximize);
  define(Restore.Tag, Restore);
  define(Close.Tag, Close);
});

// Creates an element that is not in DOM yet, to be placed for the slot of that name
const create = <T extends Element>(tag: string, slot?: string) => {
  const element = document.createElement(tag);
  slot && element.setAttribute("slot", slot);
  return element as unknown as T;
};

// Waits until the slots have reported what was placed for them
const placed = () => new Promise((resolve) => setTimeout(resolve));

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

        then("`taskbar.root` contains `div.bar`", () => {
          const div = taskbar.root.querySelector("div.bar");
          expect(div).not.toBeNull();
        });

        when("`taskbar.root` contains `div.bar`", () => {
          let div: HTMLDivElement;
          beforeEach(() => {
            div = taskbar.root.querySelector("div.bar") as HTMLDivElement;
          });

          then(
            "`div.bar` contains `div.start`, `div.center` and `div.end`, in that order",
            () => {
              const zones = [...div.children].map((zone) => zone.className);
              expect(zones).toEqual(["start", "center", "end"]);
            }
          );

          then("`div.start` contains `pin-button`, and nothing else", () => {
            const controls = [...div.querySelectorAll("div.start > *")].map(
              (control) => control.localName
            );
            expect(controls).toEqual([Pin.Tag]);
          });

          then("`div.center` contains a `slot`", () => {
            const slot = div.querySelector("div.center > slot");
            expect(slot).not.toBeNull();
          });

          then(
            "`div.end` contains `minimize-button`, `maximize-button`, `restore-button` and `close-button`, in that order, and nothing else",
            () => {
              const controls = [...div.querySelectorAll("div.end > *")].map(
                (control) => control.localName
              );
              expect(controls).toEqual([
                Minimize.Tag,
                Maximize.Tag,
                Restore.Tag,
                Close.Tag
              ]);
            }
          );

          then("every control has `appearance` `Appearance.FLAT`", () => {
            const controls = [
              ...div.querySelectorAll("div.start > *, div.end > *")
            ];
            const flat = controls.every(
              (control) =>
                control.getAttribute("appearance") === Appearance.FLAT
            );
            expect(flat).toBeTrue();
          });

          then("no control carries a class", () => {
            const controls = [
              ...div.querySelectorAll("div.start > *, div.end > *")
            ];
            const classes = controls.filter((control) => control.className);
            expect(classes).toEqual([]);
          });

          then("the taskbar holds no control of the host", () => {
            expect(taskbar.children.length).toBe(0);
          });
        });

        and(
          "a pin is placed inside the taskbar for the slot named `end`",
          () => {
            let pin: Pin;
            let onevent: jasmine.Spy;
            beforeEach(async () => {
              pin = taskbar.appendChild(create<Pin>(Pin.Tag, "end"));
              await placed();
              onevent = jasmine.createSpy("onevent");
              taskbar.onevent = onevent;
            });

            then("the pin is shown nowhere", () => {
              const slots = [...taskbar.root.querySelectorAll("slot")];
              const shown = slots.flatMap((slot) => slot.assignedElements());
              expect(shown).not.toContain(pin);
            });

            then("the pin keeps its appearance", () => {
              expect(pin.appearance).toBe(Appearance.FLOATING);
            });

            when("the pin is pinned", () => {
              beforeEach(() => {
                pin.pin();
              });

              then("the taskbar dispatches no event", () => {
                expect(onevent).not.toHaveBeenCalled();
              });
            });
          }
        );

        and("a pin is placed inside the taskbar", () => {
          let pin: Pin;
          let onevent: jasmine.Spy;
          beforeEach(async () => {
            pin = taskbar.appendChild(create<Pin>(Pin.Tag));
            await placed();
            onevent = jasmine.createSpy("onevent");
            taskbar.onevent = onevent;
          });

          then("the pin is shown in the `slot` of `div.center`", () => {
            const slot = taskbar.root.querySelector(
              "div.center > slot"
            ) as HTMLSlotElement;
            expect(slot.assignedElements()).toContain(pin);
          });

          then("the pin keeps its appearance", () => {
            expect(pin.appearance).toBe(Appearance.FLOATING);
          });

          when("the pin is pinned", () => {
            beforeEach(() => {
              pin.pin();
            });

            then("the taskbar dispatches no event", () => {
              expect(onevent).not.toHaveBeenCalled();
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

        then(
          "`taskbar.elements.start.pin` is a cached reference to the `pin-button`",
          () => {
            const part = taskbar.root.querySelector(Pin.Tag) as Pin;
            expect(taskbar["elements"].start.pin).toBe(part);
          }
        );

        then(
          "`taskbar.elements.end.minimize` is a cached reference to the `minimize-button`",
          () => {
            const part = taskbar.root.querySelector(Minimize.Tag) as Minimize;
            expect(taskbar["elements"].end.minimize).toBe(part);
          }
        );

        then(
          "`taskbar.elements.end.maximize` is a cached reference to the `maximize-button`",
          () => {
            const part = taskbar.root.querySelector(Maximize.Tag) as Maximize;
            expect(taskbar["elements"].end.maximize).toBe(part);
          }
        );

        then(
          "`taskbar.elements.end.restore` is a cached reference to the `restore-button`",
          () => {
            const part = taskbar.root.querySelector(Restore.Tag) as Restore;
            expect(taskbar["elements"].end.restore).toBe(part);
          }
        );

        then(
          "`taskbar.elements.end.close` is a cached reference to the `close-button`",
          () => {
            const part = taskbar.root.querySelector(Close.Tag) as Close;
            expect(taskbar["elements"].end.close).toBe(part);
          }
        );
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

        then("`taskbar.visibility` setter exists", () => {
          expect(hasSetter(taskbar, "visibility")).toBeTrue();
        });

        and("`taskbar.visibility` setter exists", () => {
          when("`taskbar.visibility` is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              taskbar.visibility = Visibility.HIDDEN;
            });

            then("`taskbar.visibility` is `Visibility.HIDDEN`", () => {
              expect(taskbar.visibility).toBe(Visibility.HIDDEN);
            });

            then("taskbar `visibility` attribute is `Visibility.HIDDEN`", () => {
              const value = taskbar.getAttribute(Attributes.VISIBILITY);
              expect(value).toBe(Visibility.HIDDEN);
            });

            when("`taskbar.visibility` is set to `Visibility.VISIBLE`", () => {
              beforeEach(() => {
                taskbar.visibility = Visibility.VISIBLE;
              });

              then("`visibility` attribute does not exist", () => {
                expect(
                  taskbar.hasAttribute(Attributes.VISIBILITY)
                ).toBeFalse();
              });
            });
          });

          when("`taskbar.visibility` is set to `null`", () => {
            beforeEach(() => {
              taskbar.visibility = null;
            });

            then("`taskbar.visibility` is `Visibility.VISIBLE`", () => {
              expect(taskbar.visibility).toBe(Visibility.VISIBLE);
            });
          });

          when("`visibility` attribute is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              taskbar.setAttribute(Attributes.VISIBILITY, Visibility.HIDDEN);
            });

            then("`taskbar.visibility` is `Visibility.HIDDEN`", () => {
              expect(taskbar.visibility).toBe(Visibility.HIDDEN);
            });
          });

          when("`visibility` attribute is set to `invalid`", () => {
            let error: Error;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                taskbar.setAttribute(Attributes.VISIBILITY, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`visibility` attribute does not exist", () => {
              expect(taskbar.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
            });

            then("`taskbar.visibility` is `Visibility.VISIBLE`", () => {
              expect(taskbar.visibility).toBe(Visibility.VISIBLE);
            });

            then("an error is reported", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid visibility value: invalid'",
              () => {
                expect(error.message).toBe("Invalid visibility value: invalid");
              }
            );
          });

          when("`visibility` attribute is set to `Visibility.VISIBLE`", () => {
            beforeEach(() => {
              taskbar.setAttribute(Attributes.VISIBILITY, Visibility.VISIBLE);
            });

            then("`visibility` attribute does not exist", () => {
              expect(taskbar.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
            });
          });

          and("`taskbar.visibility` is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              taskbar.visibility = Visibility.HIDDEN;
            });

            when("`visibility` attribute is set to `invalid`", () => {
              beforeEach(async () => {
                await jasmine.spyOnGlobalErrorsAsync(async () => {
                  taskbar.setAttribute(Attributes.VISIBILITY, "invalid");
                });
              });

              then("`visibility` attribute is `Visibility.HIDDEN`", () => {
                const value = taskbar.getAttribute(Attributes.VISIBILITY);
                expect(value).toBe(Visibility.HIDDEN);
              });
            });
          });

          when("`taskbar.visibility` is set to `invalid`", () => {
            let error: Error;
            beforeEach(() => {
              try {
                // @ts-expect-error
                taskbar.visibility = "invalid";
              } catch (err) {
                error = err as Error;
              }
            });

            then("an error is thrown", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid visibility value: invalid'",
              () => {
                expect(error.message).toBe("Invalid visibility value: invalid");
              }
            );
          });
        });
      });
    });
  });
});

state(State.ORIENTATION, () => {
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

        then("`taskbar.orientation` getter exists", () => {
          expect(taskbar.orientation).toBeDefined();
        });

        when("`taskbar.orientation` getter exists", () => {
          then("`taskbar.orientation` is `Orientation.LANDSCAPE`", () => {
            expect(taskbar.orientation).toBe(Orientation.LANDSCAPE);
          });
        });

        then("`orientation` attribute does not exist", () => {
          expect(taskbar.hasAttribute(Attributes.ORIENTATION)).toBeFalse();
        });

        then("`taskbar.orientation` setter exists", () => {
          expect(hasSetter(taskbar, "orientation")).toBeTrue();
        });

        and("`taskbar.orientation` setter exists", () => {
          when("`taskbar.orientation` is set to `Orientation.PORTRAIT`", () => {
            beforeEach(() => {
              taskbar.orientation = Orientation.PORTRAIT;
            });

            then("`taskbar.orientation` is `Orientation.PORTRAIT`", () => {
              expect(taskbar.orientation).toBe(Orientation.PORTRAIT);
            });

            then("taskbar `orientation` attribute is `Orientation.PORTRAIT`", () => {
              const value = taskbar.getAttribute(Attributes.ORIENTATION);
              expect(value).toBe(Orientation.PORTRAIT);
            });

            when("`taskbar.orientation` is set to `Orientation.LANDSCAPE`", () => {
              beforeEach(() => {
                taskbar.orientation = Orientation.LANDSCAPE;
              });

              then("`orientation` attribute does not exist", () => {
                expect(
                  taskbar.hasAttribute(Attributes.ORIENTATION)
                ).toBeFalse();
              });
            });
          });

          when("`taskbar.orientation` is set to `null`", () => {
            beforeEach(() => {
              taskbar.orientation = null;
            });

            then("`taskbar.orientation` is `Orientation.LANDSCAPE`", () => {
              expect(taskbar.orientation).toBe(Orientation.LANDSCAPE);
            });
          });

          when("`orientation` attribute is set to `Orientation.PORTRAIT`", () => {
            beforeEach(() => {
              taskbar.setAttribute(Attributes.ORIENTATION, Orientation.PORTRAIT);
            });

            then("`taskbar.orientation` is `Orientation.PORTRAIT`", () => {
              expect(taskbar.orientation).toBe(Orientation.PORTRAIT);
            });
          });

          when("`orientation` attribute is set to `invalid`", () => {
            let error: Error;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                taskbar.setAttribute(Attributes.ORIENTATION, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`orientation` attribute does not exist", () => {
              expect(taskbar.hasAttribute(Attributes.ORIENTATION)).toBeFalse();
            });

            then("`taskbar.orientation` is `Orientation.LANDSCAPE`", () => {
              expect(taskbar.orientation).toBe(Orientation.LANDSCAPE);
            });

            then("an error is reported", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid orientation value: invalid'",
              () => {
                expect(error.message).toBe("Invalid orientation value: invalid");
              }
            );
          });

          when("`orientation` attribute is set to `Orientation.LANDSCAPE`", () => {
            beforeEach(() => {
              taskbar.setAttribute(
                Attributes.ORIENTATION,
                Orientation.LANDSCAPE
              );
            });

            then("`orientation` attribute does not exist", () => {
              expect(taskbar.hasAttribute(Attributes.ORIENTATION)).toBeFalse();
            });
          });

          and("`taskbar.orientation` is set to `Orientation.PORTRAIT`", () => {
            beforeEach(() => {
              taskbar.orientation = Orientation.PORTRAIT;
            });

            when("`orientation` attribute is set to `invalid`", () => {
              beforeEach(async () => {
                await jasmine.spyOnGlobalErrorsAsync(async () => {
                  taskbar.setAttribute(Attributes.ORIENTATION, "invalid");
                });
              });

              then("`orientation` attribute is `Orientation.PORTRAIT`", () => {
                const value = taskbar.getAttribute(Attributes.ORIENTATION);
                expect(value).toBe(Orientation.PORTRAIT);
              });
            });
          });

          when("`taskbar.orientation` is set to `invalid`", () => {
            let error: Error;
            beforeEach(() => {
              try {
                // @ts-expect-error
                taskbar.orientation = "invalid";
              } catch (err) {
                error = err as Error;
              }
            });

            then("an error is thrown", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid orientation value: invalid'",
              () => {
                expect(error.message).toBe("Invalid orientation value: invalid");
              }
            );
          });
        });
      });
    });
  });
});

// Control
control(Control.PIN, () => {
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

        then("`taskbar.pin` getter exists", () => {
          expect(taskbar.pin).toBeDefined();
        });

        then("`taskbar.pin` has no setter", () => {
          expect(hasSetter(taskbar, Control.PIN)).toBeFalse();
        });

        then("assigning `taskbar.pin` does not compile", () => {
          const assign = () => {
            // @ts-expect-error: `pin` is read-only
            taskbar.pin = null;
          };
          expect(assign).toEqual(jasmine.any(Function));
        });

        then("`taskbar.pin` is the `pin-button` of the taskbar", () => {
          const part = taskbar.root.querySelector(Pin.Tag) as Pin;
          expect(taskbar.pin).toBe(part);
        });

        and("a taskbar that is not in DOM", () => {
          let detached: Taskbar;
          beforeEach(() => {
            detached = document.createElement(Taskbar.Tag) as Taskbar;
          });

          then("`detached.pin` is `null`", () => {
            expect(detached.pin).toBeNull();
          });
        });
      });
    });
  });
});

control(Control.MINIMIZE, () => {
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

        then("`taskbar.minimize` getter exists", () => {
          expect(taskbar.minimize).toBeDefined();
        });

        then("`taskbar.minimize` has no setter", () => {
          expect(hasSetter(taskbar, Control.MINIMIZE)).toBeFalse();
        });

        then("assigning `taskbar.minimize` does not compile", () => {
          const assign = () => {
            // @ts-expect-error: `minimize` is read-only
            taskbar.minimize = null;
          };
          expect(assign).toEqual(jasmine.any(Function));
        });

        then(
          "`taskbar.minimize` is the `minimize-button` of the taskbar",
          () => {
            const part = taskbar.root.querySelector(Minimize.Tag) as Minimize;
            expect(taskbar.minimize).toBe(part);
          }
        );

        and("a taskbar that is not in DOM", () => {
          let detached: Taskbar;
          beforeEach(() => {
            detached = document.createElement(Taskbar.Tag) as Taskbar;
          });

          then("`detached.minimize` is `null`", () => {
            expect(detached.minimize).toBeNull();
          });
        });
      });
    });
  });
});

control(Control.MAXIMIZE, () => {
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

        then("`taskbar.maximize` getter exists", () => {
          expect(taskbar.maximize).toBeDefined();
        });

        then("`taskbar.maximize` has no setter", () => {
          expect(hasSetter(taskbar, Control.MAXIMIZE)).toBeFalse();
        });

        then("assigning `taskbar.maximize` does not compile", () => {
          const assign = () => {
            // @ts-expect-error: `maximize` is read-only
            taskbar.maximize = null;
          };
          expect(assign).toEqual(jasmine.any(Function));
        });

        then(
          "`taskbar.maximize` is the `maximize-button` of the taskbar",
          () => {
            const part = taskbar.root.querySelector(Maximize.Tag) as Maximize;
            expect(taskbar.maximize).toBe(part);
          }
        );

        and("a taskbar that is not in DOM", () => {
          let detached: Taskbar;
          beforeEach(() => {
            detached = document.createElement(Taskbar.Tag) as Taskbar;
          });

          then("`detached.maximize` is `null`", () => {
            expect(detached.maximize).toBeNull();
          });
        });
      });
    });
  });
});

control(Control.RESTORE, () => {
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

        then("`taskbar.restore` getter exists", () => {
          expect(taskbar.restore).toBeDefined();
        });

        then("`taskbar.restore` has no setter", () => {
          expect(hasSetter(taskbar, Control.RESTORE)).toBeFalse();
        });

        then("assigning `taskbar.restore` does not compile", () => {
          const assign = () => {
            // @ts-expect-error: `restore` is read-only
            taskbar.restore = null;
          };
          expect(assign).toEqual(jasmine.any(Function));
        });

        then("`taskbar.restore` is the `restore-button` of the taskbar", () => {
          const part = taskbar.root.querySelector(Restore.Tag) as Restore;
          expect(taskbar.restore).toBe(part);
        });

        and("a taskbar that is not in DOM", () => {
          let detached: Taskbar;
          beforeEach(() => {
            detached = document.createElement(Taskbar.Tag) as Taskbar;
          });

          then("`detached.restore` is `null`", () => {
            expect(detached.restore).toBeNull();
          });
        });
      });
    });
  });
});

// Operation

operation(Operation.HIDE, () => {
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

        then("`taskbar.hide` method exists", () => {
          expect(taskbar.hide).toBeDefined();
        });

        and("`taskbar.hide` method exists", () => {
          when("invoking `taskbar.hide`", () => {
            let result: unknown;
            beforeEach(() => {
              result = taskbar.hide();
            });

            then("`taskbar.visibility` is `Visibility.HIDDEN`", () => {
              expect(taskbar.visibility).toBe(Visibility.HIDDEN);
            });

            then("`taskbar.hide` returns nothing", () => {
              expect(result).toBeUndefined();
            });
          });
        });
      });
    });
  });
});

operation(Operation.SHOW, () => {
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

        then("`taskbar.show` method exists", () => {
          expect(taskbar.show).toBeDefined();
        });

        and("`taskbar.show` method exists", () => {
          and("`taskbar.visibility` is `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              taskbar.visibility = Visibility.HIDDEN;
            });

            when("invoking `taskbar.show`", () => {
              let result: unknown;
              beforeEach(() => {
                result = taskbar.show();
              });

              then("`taskbar.visibility` is `Visibility.VISIBLE`", () => {
                expect(taskbar.visibility).toBe(Visibility.VISIBLE);
              });

              then("`taskbar.show` returns nothing", () => {
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

// Event

events(Event.ON_HIDE, () => {
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

        then("`taskbar.onhide` setter exists", () => {
          expect(hasSetter(taskbar, Event.ON_HIDE)).toBeTrue();
        });

        and("`taskbar.onhide` setter exists", () => {
          and("`taskbar.onhide` is set to a listener", () => {
            let onhide: jasmine.Spy;
            beforeEach(() => {
              onhide = jasmine.createSpy("onhide");
              taskbar.onhide = onhide;
            });

            when("`taskbar.visibility` is set to `Visibility.HIDDEN`", () => {
              beforeEach(() => {
                taskbar.visibility = Visibility.HIDDEN;
              });

              then("`taskbar.onhide` is called", () => {
                expect(onhide).toHaveBeenCalled();
              });

              then(
                "`taskbar.onhide` is called with `{ detail: { visibility: Visibility.HIDDEN } }`",
                () => {
                  const message = {
                    detail: { visibility: Visibility.HIDDEN }
                  };
                  expect(onhide).toHaveBeenCalledWith(
                    jasmine.objectContaining(message)
                  );
                }
              );
            });

            when(
              "`taskbar.visibility` is set to `Visibility.HIDDEN` twice",
              () => {
                beforeEach(() => {
                  taskbar.visibility = Visibility.HIDDEN;
                  taskbar.visibility = Visibility.HIDDEN;
                });

                then("`taskbar.onhide` is called once", () => {
                  expect(onhide).toHaveBeenCalledTimes(1);
                });
              }
            );

            and("`taskbar.onhide` is set to a new listener", () => {
              let onhide2: jasmine.Spy;
              beforeEach(() => {
                onhide2 = jasmine.createSpy("onhide2");
                taskbar.onhide = onhide2;
              });

              when("`taskbar.visibility` is set to `Visibility.HIDDEN`", () => {
                beforeEach(() => {
                  taskbar.visibility = Visibility.HIDDEN;
                });

                then("old `taskbar.onhide` is not called", () => {
                  expect(onhide).not.toHaveBeenCalled();
                });

                then("new `taskbar.onhide` is called", () => {
                  expect(onhide2).toHaveBeenCalled();
                });
              });
            });

            when("`taskbar.onhide` is set to `invalid`", () => {
              let error: Error;
              beforeEach(() => {
                try {
                  // @ts-expect-error
                  taskbar.onhide = "invalid";
                } catch (err) {
                  error = err as Error;
                }
              });

              then("an error is thrown", () => {
                expect(error).toBeDefined();
              });

              then(
                "error message contains 'Invalid onhide value: invalid'",
                () => {
                  expect(error.message).toBe("Invalid onhide value: invalid");
                }
              );

              when("`taskbar.visibility` is set to `Visibility.HIDDEN`", () => {
                beforeEach(() => {
                  taskbar.visibility = Visibility.HIDDEN;
                });

                then("`taskbar.onhide` is still called", () => {
                  expect(onhide).toHaveBeenCalled();
                });
              });
            });
          });
        });
      });
    });
  });
});

events(Event.ON_SHOW, () => {
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

        then("`taskbar.onshow` setter exists", () => {
          expect(hasSetter(taskbar, Event.ON_SHOW)).toBeTrue();
        });

        and("`taskbar.onshow` setter exists", () => {
          and("`taskbar.visibility` is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              taskbar.visibility = Visibility.HIDDEN;
            });

            and("`taskbar.onshow` is set to a listener", () => {
              let onshow: jasmine.Spy;
              beforeEach(() => {
                onshow = jasmine.createSpy("onshow");
                taskbar.onshow = onshow;
              });

              when(
                "`taskbar.visibility` is set to `Visibility.VISIBLE`",
                () => {
                  beforeEach(() => {
                    taskbar.visibility = Visibility.VISIBLE;
                  });

                  then("`taskbar.onshow` is called", () => {
                    expect(onshow).toHaveBeenCalled();
                  });

                  then(
                    "`taskbar.onshow` is called with `{ detail: { visibility: Visibility.VISIBLE } }`",
                    () => {
                      const message = {
                        detail: { visibility: Visibility.VISIBLE }
                      };
                      expect(onshow).toHaveBeenCalledWith(
                        jasmine.objectContaining(message)
                      );
                    }
                  );
                }
              );

              when(
                "`taskbar.visibility` is set to `Visibility.VISIBLE` twice",
                () => {
                  beforeEach(() => {
                    taskbar.visibility = Visibility.VISIBLE;
                    taskbar.visibility = Visibility.VISIBLE;
                  });

                  then("`taskbar.onshow` is called once", () => {
                    expect(onshow).toHaveBeenCalledTimes(1);
                  });
                }
              );

              and("`taskbar.onshow` is set to a new listener", () => {
                let onshow2: jasmine.Spy;
                beforeEach(() => {
                  onshow2 = jasmine.createSpy("onshow2");
                  taskbar.onshow = onshow2;
                });

                when(
                  "`taskbar.visibility` is set to `Visibility.VISIBLE`",
                  () => {
                    beforeEach(() => {
                      taskbar.visibility = Visibility.VISIBLE;
                    });

                    then("old `taskbar.onshow` is not called", () => {
                      expect(onshow).not.toHaveBeenCalled();
                    });

                    then("new `taskbar.onshow` is called", () => {
                      expect(onshow2).toHaveBeenCalled();
                    });
                  }
                );
              });

              when("`taskbar.onshow` is set to `invalid`", () => {
                let error: Error;
                beforeEach(() => {
                  try {
                    // @ts-expect-error
                    taskbar.onshow = "invalid";
                  } catch (err) {
                    error = err as Error;
                  }
                });

                then("an error is thrown", () => {
                  expect(error).toBeDefined();
                });

                then(
                  "error message contains 'Invalid onshow value: invalid'",
                  () => {
                    expect(error.message).toBe("Invalid onshow value: invalid");
                  }
                );

                when(
                  "`taskbar.visibility` is set to `Visibility.VISIBLE`",
                  () => {
                    beforeEach(() => {
                      taskbar.visibility = Visibility.VISIBLE;
                    });

                    then("`taskbar.onshow` is still called", () => {
                      expect(onshow).toHaveBeenCalled();
                    });
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});
