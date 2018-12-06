# Head-up example app

To add HeadUp to your project:

```
npm install head-up vue vue-template-compiler
yarn add head-up vue vue-template-compiler
```

`vue-template-compiler` is needed for compiling templates.

Then import it in your root app JS.

```js
import HeadUp from 'head-up';
Vue.use(HeadUp);
```

## Dev mode

To use library from source (e.g. GitHub branch) point to 

```js
import HeadUp from 'head-up/src';
```

Two additional packages are needed to compile PostCSS correctly:
```
npm i -D postcss-preset-env rucksack-css
yarn add -D postcss-preset-env rucksack-css
```

And `postcss.config.js`

```js
module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': true,
      },
    },
    'rucksack-css': {},
  },
};
```
