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

### Advanced usage

This plugin relies on a behavior of CSS that if browsers don't recognize a certain selector they drop the whole rule even if other selectors after the unrecognized one match. The default selector used, `'_:-ms-fullscreen'`, is recognized only by IE 11. You can change it to a different one that is recognized by other browsers by passing a `ieSelector` option, e.g.:
```js
postcss([
    require('postcss-ie11-pseudo-class')({
        ieSelector: '_:-ms-lang(x)',
    }),
])
```
will match IE 10 and 11. Note, however, that IE 10 support is not official so bugs affecting only that browser (and not affecting IE 11) may not be fixed.

See [PostCSS] docs for examples for your environment.

## Inspirations

The project & its code is inspired by [postcss-fixie](https://www.npmjs.com/package/postcss-fixie).
