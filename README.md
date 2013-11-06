# CSSComb [![CSSComb](logo.png)](http://csscomb.com/)
[![Build Status](https://secure.travis-ci.org/csscomb/csscomb.js.png?branch=master)](http://travis-ci.org/csscomb/csscomb.js)

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
    -l, --lint           in case some fixes needed returns an error
```

## Configuration

`csscomb` is configured using [.csscomb.json](https://github.com/csscomb/csscomb.js/blob/master/.csscomb.json) file, located in the project root.

Example configuration:
```json
{
    "exclude": ["node_modules/**"],
    "verbose": true,

    "always-semicolon": true,
    "block-indent": true,
    "colon-space": true,
    "color-case": "lower",
    "color-shorthand": true,
    "element-case": "lower",
    "eof-newline": true,
    "leading-zero": false,
    "remove-empty-rulesets": true,
    "rule-indent": true,
    "stick-brace": true,
    "strip-spaces": true,
    "unitless-zero": true,
    "vendor-prefix-align": true
}
```

## Options

### exclude

Available values: `{String[]}`

Array of [Ant path patterns](http://ant.apache.org/manual/dirtasks.html#patterns) to exclude.

Example: `{ "exclude": ["node_modules/**"] }` - exclude all files and directories under `node_modules` dir.

### verbose

Available value: `{Boolean}` `true`

Config mode: `{ "verbose": true }`
```bash
$ ./bin/csscomb ./test
✓ test/integral.origin.css
  test/integral.expect.css

2 files processed
1 file fixed
96 ms spent
```

CLI mode:
```bash
$ ./bin/csscomb ./test --verbose
$ ./bin/csscomb ./test -v
```

### always-semicolon

Available value: `{Boolean}` `true`

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
  * `{Boolean}` `true` (means 4 spaces)
  * `{Number}` of spaces
  * `{String}` of whitespace characters (`/[ \t]+/`)

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
  * `{Boolean}` `true` (means `after`) or `false` (no whitespace at all)
  * `{String}`: `before`, `after`, `both` or any combination of whitespaces
  and/or a colon (` `, `: `, `\t:\n\t` etc.)
  * `{Array}` with two `{String}` values: for setting left and right whitespace around a colon

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

Example: `{ "colon-space": "" }`

```css
/* before */
a { color: red }

/* after */
a { color:red }
```

Example: `{ "colon-space": ["\t", "\t"] }`

```css
/* before */
a { color: red }

/* after */
a { color	:	red }
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

### combinator-space

Available values:
  * `{Boolean}`: `true` sets one space, `false` removes the spaces.
  * `{String}`: any combination of whitespaces.
  * `{Array}` with two `{String}` values: for setting left and right whitespace.

Example: `{ "combinator-space": true }`

```css
/* before */
a>b { color: red }

/* after */
a > b { color: red }
```

Example: `{ "combinator-space": "" }`

```css
/* before */
a > b { color: red }

/* after */
a>b { color: red }
```

Example: `{ "combinator-space": [" ", "\n"] }`

```css
/* before */
a>b { color: red }

/* after */
a >
b { color: red }
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

### eof-newline

Available values: `{Boolean}` `true` or `false`

Example: `{ "eof-newline": true }`

`a { color: red }` &rarr; `a { color: red }\n`

Example: `{ "eof-newline": false }`

`a { color: red }\n` &rarr; `a { color: red }`

### leading-zero

Available values: `{Boolean}` `true` or `false`

Example: `{ "leading-zero": false }`

```css
/* before */
p { padding: 0.5em }

/* after */
p { padding: .5em }
```

### remove-empty-rulesets

Available values: `{Boolean}` `true`

Example: `{ "remove-empty-rulesets": true }` - remove rulesets that have no declarations or comments.

`a { color: red; } p { /* hey */ } b { }` &rarr; `a { color: red; } p { /* hey */ } `

### rule-indent

**Note**: better to use with [block-indent](#block-indent)

Available values:
  * `{Boolean}` `true` (means 4 spaces)
  * `{Number}` of spaces
  * `{String}` of whitespace characters (`/[ \t]+/`)

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
  * `{Boolean}` `true` (means 1 space)
  * `{Number}` of spaces
  * `{String}` of whitespace characters (`/[ \t\n]+/`)

Example: `{ "stick-brace": "\n" }`

```css
/* before */
a { color:red }

/* after */
a
{ color:red }
```

### strip-spaces

Available value: `{Boolean}` `true`

Example: `{ "strip-spaces": true }`

`a { color: red } \n \n \n` &rarr; `a { color: red }\n`

`a { color: red }\t` &rarr; `a { color: red }`

### unitless-zero

Available value: `{Boolean}` `true`

Example: `{ "unitless-zero": true }`

```css
/* before */
img { border: 0px }

/* after */
img { border: 0 }
```

### vendor-prefix-align

Available value: `{Boolean}` `true`

Example: `{ "vendor-prefix-align": true }`

```css
/* before */
a
{
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background: -webkit-linear-gradient(top, #fff 0, #eee 100%);
    background: -moz-linear-gradient(top, #fff 0, #eee 100%);
    background: linear-gradient(to bottom, #fff 0, #eee 100%);
}

/* after */
a
{
    -webkit-border-radius: 3px;
       -moz-border-radius: 3px;
            border-radius: 3px;
    background: -webkit-linear-gradient(top, #fff 0, #eee 100%);
    background:    -moz-linear-gradient(top, #fff 0, #eee 100%);
    background:         linear-gradient(to bottom, #fff 0, #eee 100%);
}
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
[@kizu](https://github.com/kizu),
[@anton-rudeshko](https://github.com/anton-rudeshko),
[@mishaberezin](https://github.com/mishaberezin)

## License

This software is released under the terms of the [MIT license](https://github.com/csscomb/csscomb.js/blob/master/LICENSE).

## Other projects
* https://github.com/senchalabs/cssbeautify
* https://github.com/css/gonzales
* https://github.com/css/csso
* https://github.com/nzakas/parser-lib
