# `postcss-ie11-pseudo-class` [![Build Status][ci-img]][ci]

[PostCSS] plugin adding support for the `:ie11` pseudo-class targetting IE 11 only.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mgol/postcss-ie11-pseudo-class.svg
[ci]:      https://travis-ci.org/mgol/postcss-ie11-pseudo-class

This plugin adds basic support for the `:ie11` pseudo-class that targets IE 11 only. This allows projects to add CSS rules targetting only this browser.

To use, prepend your CSS selector with `:ie11`. The pseudo-class behaves as if it applied to a special element above `:root`/`html`.

Example input:
```css
:ie11 .custom-class {
    color: black;
}
```

Example output:
```css
:-ms-fullscreen, .custom-class {
    color: black;
}
```

It also works with multiple selectors:

Input:
```css
a,
:ie11 .another-class,
:ie11 [my-attr],
.bar:not(.baz) {
    color: black;
    height: 10px;
}
```

Output:
```css
a,
.bar:not(.baz) {
    color: black;
    height: 10px;
}
:-ms-fullscreen,
.another-class,
[my-attr] {
    color: black;
    height: 10px;
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
