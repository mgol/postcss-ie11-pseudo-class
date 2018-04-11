# `postcss-ie11-pseudo-class` [![Build Status][ci-img]][ci]

[PostCSS] plugin adding support for the `:ie11` pseudo-class targeting IE 11 only.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mgol/postcss-ie11-pseudo-class.svg
[ci]:      https://travis-ci.org/mgol/postcss-ie11-pseudo-class

The `:ie11` pseudo-class allows projects to add CSS rules targeting only this browser.

To use, prepend your CSS selector with `:ie11`. The pseudo-class behaves as if it applied to a special element above `:root`/`html`.

Example input:
```css
:ie11 .custom-class {
    /* This will apply only to IE 11. */
    color: black;
}
```

Example output:
```css
_:-ms-fullscreen, .custom-class {
    /* This will apply only to IE 11. */
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
_:-ms-fullscreen,
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

`ieSelector`: A selector used to taint a block cloned outside of `@supports not` so that it's accepted in IE 11 only. By default `'_:-ms-fullscreen'`, can be changed to e.g. `:-ms-lang(x)` to support IE 10 as well. Use with caution so that good browsers are not punished!

See [PostCSS] docs for examples for your environment.

## Inspirations

The project & its code is inspired by [postcss-fixie](https://www.npmjs.com/package/postcss-fixie).
