# figui-loader

A webpack loader for bundling figma plugin UIs into your main plugin bundle.

The output of the loader is a string for a `<script>` tag containing the UI bundle.

## Installing

Grab it from npm:

```
npm install --save-dev figui-loader
```

## Usage

Assuming your UI entrypoint is `ui.ts`, you can bundle it and use it in your plugin's main code like this:

```ts
import html from 'figui-loader!./ui';
// html is a string with <script>...</script>
figma.showUI(html);
```

If your UI requires actual HTML (e.g. `<link>` or a root `<div>`), you can either prepend it to the `html` returned by the loader, or have your UI bundle dynamically inject the required HTML into the DOM itself.

### Typings

You'll also need to add typings, so update your `tsconfig.json` with the loader's type root:

```js
{
  "compilerOptions": {
    ...
    "typeRoots": [
      ...
      "./node_modules/figui-loader/types"
    ]
  },
}
```
