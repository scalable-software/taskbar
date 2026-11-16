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
  Event
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

// Gesture
