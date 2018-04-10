# `postcss-ie11-pseudo-class` [![Build Status][ci-img]][ci]

[PostCSS] plugin adding support for the `:ie11` pseudo-class targetting IE 11 only.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mgol/postcss-ie11-pseudo-class.svg
[ci]:      https://travis-ci.org/mgol/postcss-ie11-pseudo-class

This plugin adds basic support for the `:ie11` pseudo-class that targets IE 11 only. This allows projects to add CSS rules targetting only this browser.

Example input:
```css
:ie11(.custom-class) {
    color: black;
}
```

Example output:
```css
:-ms-fullscreen, .custom-class {
    color: black;
}
```

## Usage

```js
postcss([
    require('postcss-ie11-pseudo-class'),
])
```

### Options

`ieSelector`: A selector used to taint a block cloned outside of `@supports not` so that it's accepted in IE 11 only. By default `':-ms-fullscreen'`, can be changed to e.g. `:-ms-lang(x)` to support IE 10 as well. Use with caution so that good browsers are not punished!

See [PostCSS] docs for examples for your environment.

## Inspirations

The project & its code is inspired by [postcss-fixie](https://www.npmjs.com/package/postcss-fixie).
