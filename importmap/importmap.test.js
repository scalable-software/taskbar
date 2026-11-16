/**
 * Browser do not support external import maps yet.
 * The inject function is a synchronous function that will be used to inject the import map into the html file used for testing.
 * The references used in the importmap maybe a local file, a NPM package path or a CDN path.
 */
inject(
  {
    imports: {
      "@scalable.software/taskbar": "./src/index.js",
      "@scalable.software/component":
        "./node_modules/@scalable.software/component/dist/index.js",
      "@scalable.software/pin":
        "./node_modules/@scalable.software/pin/dist/index.js",
      "@scalable.software/minimize":
        "./node_modules/@scalable.software/minimize/dist/index.js",
      "@scalable.software/maximize":
        "./node_modules/@scalable.software/maximize/dist/index.js",
      "@scalable.software/restore":
        "./node_modules/@scalable.software/restore/dist/index.js",
      "@scalable.software/close":
        "./node_modules/@scalable.software/close/dist/index.js"
    }
  },
  "importmap"
);
