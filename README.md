# CSSCOMB [![Build Status](https://secure.travis-ci.org/csscomb/csscomb.js.png?branch=master)](http://travis-ci.org/csscomb/csscomb.js)

CSSComb is a coding style formatter for CSS.
You can easily write your own [configuration](#configuration) to make your style sheets beautiful and consistent.

The main feature is the [sorting properties](#sort-order) in specific order.
It was inspired by the same-named [@miripiruni](https://github.com/miripiruni)'s [PHP-based tool](https://github.com/csscomb/csscomb).
This is the new JavaScript version, based on powerful CSS parser [Gonzales](https://github.com/css/gonzales).

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

`csscomb` is configured using [.csscomb.json](https://github.com/csscomb/csscomb.js/blob/master/.csscomb.json) file, located in the project root.

Example configuration:
```json
{
    "exclude": ["node_modules/**"],
    "always-semicolon": true,
    "block-indent": true,
    "colon-space": true,
    "color-case": "lower",
    "color-shorthand": true,
    "element-case": "lower",
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

**Note**: better to use with [rule-indent](#rule-indent)

Available values:
  * `{Boolean}` true (means 4 spaces)
  * `{Number}` of spaces
  * `{String}` of whitespace characters (`/[ \t]*/`)

Example: `{ "block-indent": 2 }`

```css
/* before */
  a { color: red }
  @media all { a { color: green } }

/* after */
a { color: red
}
@media all {
  a { color: green
  }
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

### color-shorthand

Available values: `{Boolean}` `true` or `false`

Example: `{ "color-shorthand": true }`

```css
/* before */
b { color: #ffcc00 }

/* after */
b { color: #fc0 }
```

### element-case

Available values: `{String}` `lower` or `upper`

Example: `{ "element-case": "upper" }`

```css
/* before */
li > a { color: red }

/* after */
LI > A { color: red }
```

### leading-zero

Available values: `{Boolean}` `true` or `false`

Example: `{ "leading-zero": false }`

```css
/* before */
p { padding: 0.5em }

/* after */
p { padding: .5em }
```

### rule-indent

**Note**: better to use with [block-indent](#block-indent)

Available values:
  * `{Boolean}` true (means 4 spaces)
  * `{Number}` of spaces
  * `{String}` of whitespace characters (`/[ \t]*/`)

Example: `{ "rule-indent": 2 }`

```css
/* before */
a { color:red; margin:0 }

/* after */
a {
  color:red;
  margin:0 }
```

### sort-order

**Note**: you can use an example of [.csscomb.json](https://github.com/csscomb/csscomb.js/blob/master/.csscomb.json) to set your own sort order

Available values:
  * `{Array}` of rules
  * `{Array}` of arrays of rules for groups separation

Example: `{ "sort-order": [ "margin", "padding" ] }`

```css
/* before */
p {
    padding: 0;
    margin: 0;
}

/* after */
p {
    margin: 0;
    padding: 0;
}
```

Example: `{ "sort-order": [ [ "margin", "padding" ], [ "border", "background" ] ] }`

```css
/* before */
p {
    background: none;
    border: 0;
    margin: 0;
    padding: 0;
}

/* after */
p {
    margin: 0;
    padding: 0;

    border: 0;
    background: none;
}
```

### stick-brace

Available values:
  * `{Boolean}` true (means 1 spaces)
  * `{String}` of whitespace characters (`/[ \t\n]*/`)

Example: `{ "stick-brace": "\n" }`

```css
/* before */
a { color:red }

/* after */
a
{ color:red }
```

### strip-spaces

Available value: `{Boolean}` true

Example: `{ "strip-spaces": true }`

Before:
```a { color: red } \nb { font-weight: normal }\n\n\n`
After: `a { color: red }\nb { font-weight: normal }\n`

### unitless-zero

Available value: `{Boolean}` `true`

Example: `{ "unitless-zero": true }`

```css
/* before */
img { border: 0px }

/* after */
img { border: 0 }
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
[@ignovak](https://github.com/ignovak),
[@kizu](https://github.com/kizu)

## License

This software is released under the terms of the [MIT license](https://github.com/csscomb/csscomb.js/blob/master/LICENSE).

## Other projects
* https://github.com/senchalabs/cssbeautify
* https://github.com/css/gonzales
* https://github.com/css/csso
