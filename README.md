# CSSCOMB [![Build Status](https://secure.travis-ci.org/csscomb/csscomb.js.png?branch=master)](http://travis-ci.org/csscomb/csscomb.js)

CSSComb is a coding style formatter for CSS.

## Installation

```bash
npm install csscomb
```

To run `csscomb`, you can use the following command from the project root:

```bash
./node_modules/.bin/csscomb path[ path[...]]
```

```bash
./node_modules/.bin/csscomb --help

  Usage: csscomb [options] <file ...>

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -c, --config [path]  configuration file path
```

## Configuration

`csscomb` is configured using `.csscomb.json` file, located in the project root.

Example configuration:
```json
{
    "exclude": ["node_modules/**"],
    "always-semicolon": true,
    "block-indent": true,
    "colon-space": true,
    "color-case": "lower",
    "color-shorthand": true,
    "leading-zero": false,
    "rule-indent": true,
    "stick-brace": true,
    "strip-spaces": true,
    "unitless-zero": true
}
```

## Options

### always-semicolon

Available value: `{Boolean}` true

Example: `{ "always-semicolon": true }`
```css
/* before */
a { color: red }

/* after */
a { color: red; }
```

### block-indent

Available values:
  * `{Boolean}` true
  * `{Number}` of spaces
  * `{String}` of space characters (`/[ \t]*`)

Example: `{ "block-indent": 2 }`
```css
/* before */
  a { color: red }
  @media all { a { color: green } }

/* after */
a { color: red }
@media all {
  a { color: green }
}
```

### colon-space

Available values:
  * `{Boolean}` true (means `after`)
  * `{String}`: `before`, `after`, `both` or any combination of whitespaces
  and/or a colon (` `, `: `, `\t:\n\t` etc.)

Example: `{ "colon-space": true }`

```css
/* before */
a { color:red }

/* after */
a { color: red }
```

Example: `{ "colon-space": ":\n\t\t" }`

```css
/* before */
a {
  color: red;
}

/* after */
a {
  color:
    red;
}
```

Example: `{ "colon-space": ":" }`

```css
/* before */
a { color: red }

/* after */
a { color:red }
```

### color-case

Available values: `{String}` `lower` or `upper`

Example: `{ "color-case": "lower" }`
```css
/* before */
a { color: #FFF }

/* after */
a { color: #fff }
```

## Tests

Run `npm test` for tests.

## Contributing

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTE.md).

## Authors

[@mishanga](https://github.com/mishanga)

Thanks for assistance and contributions:

[@miripiruni](https://github.com/miripiruni),
[@puzankov](https://github.com/puzankov),
[@L0stSoul](https://github.com/L0stSoul),
[@ignovak](https://github.com/ignovak)

## License

This software is released under the terms of the [MIT license](https://github.com/csscomb/csscomb.js/blob/master/LICENSE).

## Other projects
* https://github.com/senchalabs/cssbeautify
* https://github.com/css/gonzales
* https://github.com/css/csso
