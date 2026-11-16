import { State, Visibility, Orientation } from "@scalable.software/taskbar";

import { Validate } from "@scalable.software/taskbar";

validation(State.VISIBILITY, () => {
  given("Validate imported", () => {
    then("Validate is defined", () => {
      expect(Validate).toBeDefined();
    });

    and("Validate is defined", () => {
      then("`Validate.visibility` static method exists", () => {
        expect(Validate.visibility).toBeDefined();
      });

      and("`value` is `Visibility.VISIBLE`", () => {
        let value: any;
        beforeEach(() => {
          value = Visibility.VISIBLE;
        });

        when("`Validate.visibility(value)` is called", () => {
          let error: unknown | undefined;
          let result: any;
          beforeEach(() => {
            try {
              result = Validate.visibility(value);
            } catch (err) {
              error = err;
            }
          });
          then("no error is thrown", () => {
            expect(error).toBeUndefined();
          });

          then("result is `Visibility.VISIBLE`", () => {
            expect(result).toBe(Visibility.VISIBLE);
          });
        });
      });

      and("`value` is `Visibility.HIDDEN`", () => {
        let value: any;
        beforeEach(() => {
          value = Visibility.HIDDEN;
        });

        when("`Validate.visibility(value)` is called", () => {
          let error: unknown | undefined;
          let result: any;
          beforeEach(() => {
            try {
              result = Validate.visibility(value);
            } catch (err) {
              error = err;
            }
          });
          then("no error is thrown", () => {
            expect(error).toBeUndefined();
          });

          then("result is `Visibility.HIDDEN`", () => {
            expect(result).toBe(Visibility.HIDDEN);
          });
        });
      });

      and("`value` is `invalid`", () => {
        let value: any;
        beforeEach(() => {
          value = "invalid";
        });

        when("`Validate.visibility(value)` is called", () => {
          let error: unknown | undefined;
          beforeEach(() => {
            try {
              Validate.visibility(value);
            } catch (err) {
              error = err;
            }
          });

          then("an error is thrown", () => {
            expect(error).not.toBeUndefined();
          });

          then(
            "error message contains 'Invalid visibility value: invalid'",
            () => {
              expect((error as Error).message).toEqual(
                "Invalid visibility value: invalid"
              );
            }
          );
        });
      });
    });
  });
});

validation(State.ORIENTATION, () => {
  given("Validate imported", () => {
    then("Validate is defined", () => {
      expect(Validate).toBeDefined();
    });

    and("Validate is defined", () => {
      then("`Validate.orientation` static method exists", () => {
        expect(Validate.orientation).toBeDefined();
      });

      and("`value` is `Orientation.LANDSCAPE`", () => {
        let value: any;
        beforeEach(() => {
          value = Orientation.LANDSCAPE;
        });

        when("`Validate.orientation(value)` is called", () => {
          let error: unknown | undefined;
          let result: any;
          beforeEach(() => {
            try {
              result = Validate.orientation(value);
            } catch (err) {
              error = err;
            }
          });
          then("no error is thrown", () => {
            expect(error).toBeUndefined();
          });

          then("result is `Orientation.LANDSCAPE`", () => {
            expect(result).toBe(Orientation.LANDSCAPE);
          });
        });
      });

      and("`value` is `Orientation.PORTRAIT`", () => {
        let value: any;
        beforeEach(() => {
          value = Orientation.PORTRAIT;
        });

        when("`Validate.orientation(value)` is called", () => {
          let error: unknown | undefined;
          let result: any;
          beforeEach(() => {
            try {
              result = Validate.orientation(value);
            } catch (err) {
              error = err;
            }
          });
          then("no error is thrown", () => {
            expect(error).toBeUndefined();
          });

          then("result is `Orientation.PORTRAIT`", () => {
            expect(result).toBe(Orientation.PORTRAIT);
          });
        });
      });

      and("`value` is `invalid`", () => {
        let value: any;
        beforeEach(() => {
          value = "invalid";
        });

        when("`Validate.orientation(value)` is called", () => {
          let error: unknown | undefined;
          beforeEach(() => {
            try {
              Validate.orientation(value);
            } catch (err) {
              error = err;
            }
          });

          then("an error is thrown", () => {
            expect(error).not.toBeUndefined();
          });

          then(
            "error message contains 'Invalid orientation value: invalid'",
            () => {
              expect((error as Error).message).toEqual(
                "Invalid orientation value: invalid"
              );
            }
          );
        });
      });
    });
  });
});
