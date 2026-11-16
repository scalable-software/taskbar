import { Template } from "@scalable.software/component";

import {
  Taskbar,
  Tag,
  CSS,
  Attributes,
  State,
  Visibility,
  Orientation,
  Operation,
  Event,
  Gesture
} from "@scalable.software/taskbar";
import { Pin, Status } from "@scalable.software/pin";
import { Minimize } from "@scalable.software/minimize";
import { Maximize } from "@scalable.software/maximize";
import { Restore } from "@scalable.software/restore";
import { Close } from "@scalable.software/close";

// Creates an element that is not in DOM yet
const create = <T extends Element>(tag: string) =>
  document.createElement(tag) as unknown as T;

// Waits until the taskbar has been told what was placed in it
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

operation(Operation.PIN, () => {
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

        then("`taskbar.pin` method exists", () => {
          expect(taskbar.pin).toBeDefined();
        });

        and("`taskbar.pin` method exists", () => {
          and("a pin is placed in the taskbar", () => {
            let pin: Pin;
            beforeEach(async () => {
              define(Pin.Tag, Pin);
              await Pin.Template.load("pin.template.html");
              pin = taskbar.appendChild(create<Pin>(Pin.Tag));
              await placed();
            });
            afterEach(() => {
              remove(Pin.Tag);
            });

            when("invoking `taskbar.pin`", () => {
              beforeEach(() => {
                taskbar.pin();
              });

              then("`pin.status` is `Status.PINNED`", () => {
                expect(pin.status).toBe(Status.PINNED);
              });
            });
          });

          and("no control is placed in the taskbar", () => {
            when("invoking `taskbar.pin`", () => {
              let result: unknown;
              beforeEach(() => {
                result = taskbar.pin();
              });

              then("`taskbar.pin` returns nothing", () => {
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

operation(Operation.UNPIN, () => {
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

        then("`taskbar.unpin` method exists", () => {
          expect(taskbar.unpin).toBeDefined();
        });

        and("`taskbar.unpin` method exists", () => {
          and("a pin is placed in the taskbar", () => {
            let pin: Pin;
            beforeEach(async () => {
              define(Pin.Tag, Pin);
              await Pin.Template.load("pin.template.html");
              pin = taskbar.appendChild(create<Pin>(Pin.Tag));
              await placed();
              pin.pin();
            });
            afterEach(() => {
              remove(Pin.Tag);
            });

            when("invoking `taskbar.unpin`", () => {
              beforeEach(() => {
                taskbar.unpin();
              });

              then("`pin.status` is `Status.UNPINNED`", () => {
                expect(pin.status).toBe(Status.UNPINNED);
              });
            });
          });

          and("no control is placed in the taskbar", () => {
            when("invoking `taskbar.unpin`", () => {
              let result: unknown;
              beforeEach(() => {
                result = taskbar.unpin();
              });

              then("`taskbar.unpin` returns nothing", () => {
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

operation(Operation.MINIMIZE, () => {
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

        then("`taskbar.minimize` method exists", () => {
          expect(taskbar.minimize).toBeDefined();
        });

        and("`taskbar.minimize` method exists", () => {
          and("a minimize control is placed in the taskbar", () => {
            let control: Minimize;
            beforeEach(async () => {
              define(Minimize.Tag, Minimize);
              await Minimize.Template.load("minimize.template.html");
              control = taskbar.appendChild(create<Minimize>(Minimize.Tag));
              await placed();
            });
            afterEach(() => {
              remove(Minimize.Tag);
            });

            and("the minimize control has a listener for `onminimize`", () => {
              let onminimize: jasmine.Spy;
              beforeEach(() => {
                onminimize = jasmine.createSpy("onminimize");
                control.onminimize = onminimize;
              });

              when("invoking `taskbar.minimize`", () => {
                beforeEach(() => {
                  taskbar.minimize();
                });

                then(
                  "the minimize control's `onminimize` is called once",
                  () => {
                    expect(onminimize).toHaveBeenCalledTimes(1);
                  }
                );
              });
            });
          });

          and("no control is placed in the taskbar", () => {
            when("invoking `taskbar.minimize`", () => {
              let result: unknown;
              beforeEach(() => {
                result = taskbar.minimize();
              });

              then("`taskbar.minimize` returns nothing", () => {
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

operation(Operation.MAXIMIZE, () => {
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

        then("`taskbar.maximize` method exists", () => {
          expect(taskbar.maximize).toBeDefined();
        });

        and("`taskbar.maximize` method exists", () => {
          and("a maximize control is placed in the taskbar", () => {
            let control: Maximize;
            beforeEach(async () => {
              define(Maximize.Tag, Maximize);
              await Maximize.Template.load("maximize.template.html");
              control = taskbar.appendChild(create<Maximize>(Maximize.Tag));
              await placed();
            });
            afterEach(() => {
              remove(Maximize.Tag);
            });

            and("the maximize control has a listener for `onmaximize`", () => {
              let onmaximize: jasmine.Spy;
              beforeEach(() => {
                onmaximize = jasmine.createSpy("onmaximize");
                control.onmaximize = onmaximize;
              });

              when("invoking `taskbar.maximize`", () => {
                beforeEach(() => {
                  taskbar.maximize();
                });

                then(
                  "the maximize control's `onmaximize` is called once",
                  () => {
                    expect(onmaximize).toHaveBeenCalledTimes(1);
                  }
                );
              });
            });
          });

          and("no control is placed in the taskbar", () => {
            when("invoking `taskbar.maximize`", () => {
              let result: unknown;
              beforeEach(() => {
                result = taskbar.maximize();
              });

              then("`taskbar.maximize` returns nothing", () => {
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

operation(Operation.RESTORE, () => {
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

        then("`taskbar.restore` method exists", () => {
          expect(taskbar.restore).toBeDefined();
        });

        and("`taskbar.restore` method exists", () => {
          and("a restore control is placed in the taskbar", () => {
            let control: Restore;
            beforeEach(async () => {
              define(Restore.Tag, Restore);
              await Restore.Template.load("restore.template.html");
              control = taskbar.appendChild(create<Restore>(Restore.Tag));
              await placed();
            });
            afterEach(() => {
              remove(Restore.Tag);
            });

            and("the restore control has a listener for `onrestore`", () => {
              let onrestore: jasmine.Spy;
              beforeEach(() => {
                onrestore = jasmine.createSpy("onrestore");
                control.onrestore = onrestore;
              });

              when("invoking `taskbar.restore`", () => {
                beforeEach(() => {
                  taskbar.restore();
                });

                then("the restore control's `onrestore` is called once", () => {
                  expect(onrestore).toHaveBeenCalledTimes(1);
                });
              });
            });
          });

          and("no control is placed in the taskbar", () => {
            when("invoking `taskbar.restore`", () => {
              let result: unknown;
              beforeEach(() => {
                result = taskbar.restore();
              });

              then("`taskbar.restore` returns nothing", () => {
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

operation(Operation.CLOSE, () => {
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

        then("`taskbar.close` method exists", () => {
          expect(taskbar.close).toBeDefined();
        });

        and("`taskbar.close` method exists", () => {
          and("a close control is placed in the taskbar", () => {
            let control: Close;
            beforeEach(async () => {
              define(Close.Tag, Close);
              await Close.Template.load("close.template.html");
              control = taskbar.appendChild(create<Close>(Close.Tag));
              await placed();
            });
            afterEach(() => {
              remove(Close.Tag);
            });

            and("the close control has a listener for `onclose`", () => {
              let onclose: jasmine.Spy;
              beforeEach(() => {
                onclose = jasmine.createSpy("onclose");
                control.onclose = onclose;
              });

              when("invoking `taskbar.close`", () => {
                beforeEach(() => {
                  taskbar.close();
                });

                then("the close control's `onclose` is called once", () => {
                  expect(onclose).toHaveBeenCalledTimes(1);
                });
              });
            });
          });

          and("no control is placed in the taskbar", () => {
            when("invoking `taskbar.close`", () => {
              let result: unknown;
              beforeEach(() => {
                result = taskbar.close();
              });

              then("`taskbar.close` returns nothing", () => {
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

events(Event.ON_PIN, () => {
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

        then("`taskbar.onpin` setter exists", () => {
          expect(hasSetter(taskbar, Event.ON_PIN)).toBeTrue();
        });
      });
    });
  });
});

events(Event.ON_UNPIN, () => {
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

        then("`taskbar.onunpin` setter exists", () => {
          expect(hasSetter(taskbar, Event.ON_UNPIN)).toBeTrue();
        });
      });
    });
  });
});

events(Event.ON_MINIMIZE, () => {
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

        then("`taskbar.onminimize` setter exists", () => {
          expect(hasSetter(taskbar, Event.ON_MINIMIZE)).toBeTrue();
        });
      });
    });
  });
});

events(Event.ON_MAXIMIZE, () => {
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

        then("`taskbar.onmaximize` setter exists", () => {
          expect(hasSetter(taskbar, Event.ON_MAXIMIZE)).toBeTrue();
        });
      });
    });
  });
});

events(Event.ON_RESTORE, () => {
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

        then("`taskbar.onrestore` setter exists", () => {
          expect(hasSetter(taskbar, Event.ON_RESTORE)).toBeTrue();
        });
      });
    });
  });
});

events(Event.ON_CLOSE, () => {
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

        then("`taskbar.onclose` setter exists", () => {
          expect(hasSetter(taskbar, Event.ON_CLOSE)).toBeTrue();
        });
      });
    });
  });
});

// Gesture

gesture(Gesture.ON_PIN, () => {
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

        and("a pin is placed in the taskbar", () => {
          let pin: Pin;
          beforeEach(async () => {
            define(Pin.Tag, Pin);
            await Pin.Template.load("pin.template.html");
            pin = taskbar.appendChild(create<Pin>(Pin.Tag));
            await placed();
          });
          afterEach(() => {
            remove(Pin.Tag);
          });

          and("`taskbar.onpin` is set to a listener", () => {
            let onpin: jasmine.Spy;
            beforeEach(() => {
              onpin = jasmine.createSpy("onpin");
              taskbar.onpin = onpin;
            });

            when("the pin is pinned", () => {
              beforeEach(() => {
                pin.pin();
              });

              then("`onpin` is called once", () => {
                expect(onpin).toHaveBeenCalledTimes(1);
              });
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.ON_UNPIN, () => {
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

        and("a pin is placed in the taskbar", () => {
          let pin: Pin;
          beforeEach(async () => {
            define(Pin.Tag, Pin);
            await Pin.Template.load("pin.template.html");
            pin = taskbar.appendChild(create<Pin>(Pin.Tag));
            await placed();
            pin.pin();
          });
          afterEach(() => {
            remove(Pin.Tag);
          });

          and("`taskbar.onunpin` is set to a listener", () => {
            let onunpin: jasmine.Spy;
            beforeEach(() => {
              onunpin = jasmine.createSpy("onunpin");
              taskbar.onunpin = onunpin;
            });

            when("the pin is unpinned", () => {
              beforeEach(() => {
                pin.unpin();
              });

              then("`onunpin` is called once", () => {
                expect(onunpin).toHaveBeenCalledTimes(1);
              });
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.ON_MINIMIZE, () => {
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

        and("a minimize control is placed in the taskbar", () => {
          let control: Minimize;
          beforeEach(async () => {
            define(Minimize.Tag, Minimize);
            await Minimize.Template.load("minimize.template.html");
            control = taskbar.appendChild(create<Minimize>(Minimize.Tag));
            await placed();
          });
          afterEach(() => {
            remove(Minimize.Tag);
          });

          and("`taskbar.onminimize` is set to a listener", () => {
            let onminimize: jasmine.Spy;
            beforeEach(() => {
              onminimize = jasmine.createSpy("onminimize");
              taskbar.onminimize = onminimize;
            });

            when("the minimize control requests minimizing", () => {
              beforeEach(() => {
                control.minimize();
              });

              then("`onminimize` is called once", () => {
                expect(onminimize).toHaveBeenCalledTimes(1);
              });
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.ON_MAXIMIZE, () => {
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

        and("a maximize control is placed in the taskbar", () => {
          let control: Maximize;
          beforeEach(async () => {
            define(Maximize.Tag, Maximize);
            await Maximize.Template.load("maximize.template.html");
            control = taskbar.appendChild(create<Maximize>(Maximize.Tag));
            await placed();
          });
          afterEach(() => {
            remove(Maximize.Tag);
          });

          and("`taskbar.onmaximize` is set to a listener", () => {
            let onmaximize: jasmine.Spy;
            beforeEach(() => {
              onmaximize = jasmine.createSpy("onmaximize");
              taskbar.onmaximize = onmaximize;
            });

            when("the maximize control requests maximizing", () => {
              beforeEach(() => {
                control.maximize();
              });

              then("`onmaximize` is called once", () => {
                expect(onmaximize).toHaveBeenCalledTimes(1);
              });
            });
          });
        });
      });
    });
  });
});
