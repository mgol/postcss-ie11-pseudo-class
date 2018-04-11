'use strict';

const {ieSelector} = require('../lib/constants');
const {run} = require('./utils');

it('doesn\'t touch regular pseudo-classes', () =>
    run(
        ':not(.custom-class) { color: black; }',
        ':not(.custom-class) { color: black; }',
    ),
);

it('transforms the ":ie11" pseudo-class', () =>
    run(
        ':ie11 .custom-class { color: black; }',
        `${ ieSelector }, .custom-class { color: black; }`,
    ),
);

it('supports multiple IE & non-IE selectors', () =>
    run(
        `
            foo, :ie11 a#id:not(.another-class), :ie11 [my-attr], .bar:not(.baz), :ie11 button {
                color: black;
                height: 10px;
            }
        `,
        `
            foo, .bar:not(.baz) {
                color: black;
                height: 10px;
            }
            ${ ieSelector }, a#id:not(.another-class), [my-attr], button {
                color: black;
                height: 10px;
            }
        `,
    ),
);

it('accepts the ieSelector parameter', () =>
    run(
        ':ie11 .custom-class { color: black; }',
        '_:-ms-lang(x), .custom-class { color: black; }',
        {ieSelector: '_:-ms-lang(x)'},
    ),
);
