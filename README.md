# CSSComb [![CSSComb](logo.png)](http://csscomb.com/)
[![Build Status](https://secure.travis-ci.org/csscomb/csscomb.js.png?branch=master)](http://travis-ci.org/csscomb/csscomb.js)

CSSComb is a coding style formatter for CSS.
You can easily write your own [configuration](#configuration) to make your style sheets beautiful and consistent.

The main feature is [sorting properties](#sort-order) in a specific order.
It was inspired by [@miripiruni](https://github.com/miripiruni)'s [PHP-based tool](https://github.com/csscomb/csscomb) of the same name.
This is the new JavaScript version, based on the powerful CSS parser [Gonzales PE](https://github.com/tonyganch/gonzales-pe).

## Installation

Global installation (for use as a command-line tool):

```bash
npm install csscomb -g
```

Local installation (for use as a command-line tool within current directory):

```bash
npm install csscomb
```

To install as a project dependency (the package will appear in your dependencies):

```bash
npm install csscomb --save
```

To install as a dev dependency (the package will appear in your devDependencies):

```bash
npm install csscomb --save-dev
```

## Command Line usage

To run `csscomb`:

```bash
csscomb path[ path[...]]
```

If you installed the package locally, in the project's directory run:

```bash
./node_modules/.bin/csscomb path[ path[...]]
```

If you run `csscomb -h`, it will show some helpful information:

```bash
csscomb -h

  Usage: csscomb [options] <file ...>

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -v, --verbose        verbose mode
    -c, --config [path]  configuration file path
    -d, --detect         detect mode (would return detected options)
    -l, --lint           in case some fixes needed returns an error
```

## Node.js module usage

Besides being a great CLI, `csscomb` can be used in Node.js projects (inside
a plugin or as a dev tool):

```js
// Require:
var Comb = require('csscomb');

// Configure:
var comb = new Comb();
comb.configure(config);

// Use:
comb.processPath('style.css');
```

### configure(config)

You must configure csscomb before use. The config must be valid JSON.    
See [configuration section](#configuration) for more information.

### processPath(path)

Comb a file or a directory.    
Warning: This method rewrites the file.

```js
// One file:
comb.processPath('main.scss');

// Whole directory:
comb.processPath('assets/styles');
```

### processDirectory(path)

Comb all supported files in a directory.    
Warning: This method rewrites the files.

```js
comb.processDirectory('public/css');
```

### processFile(path)

Comb one file.    
If file's syntax is not supported, the file will be ignored.    
Warning: This method rewrites the file.

```js
comb.processFile('print.less');
```

### processString(text, syntax, filename)

Comb a stylesheet.    
If syntax is not `css`, you should pass a `syntax` parameter, too.    
`filename` is optional. It is used to print errors.

```js
// Comb a css string:
var css = 'a {top: 0; left: 0}';
var combedCSS = comb.processString(css);

// Comb a less string:
var less = '@color: tomato; a {color: @color}';
var combedLESS = comb.processString(less, 'less');
```

## Configuration

### Through `.csscomb.json`

`csscomb` is configured using the file [.csscomb.json](https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json), located in the project root.

Example configuration:
```json
{
    "exclude": ["node_modules/**"],
    "verbose": true,

    "always-semicolon": true,
    "block-indent": "    ",
    "colon-space": ["", " "],
    "color-case": "lower",
    "color-shorthand": true,
    "element-case": "lower",
    "eof-newline": true,
    "leading-zero": false,
    "quotes": "single",
    "remove-empty-rulesets": true,
    "rule-indent": "    ",
    "stick-brace": "\n",
    "strip-spaces": true,
    "unitless-zero": true,
    "vendor-prefix-align": true
}
```

**Note**: you can also use a [predefined config file](https://github.com/csscomb/csscomb.js/tree/master/config)
```bash
cp ./node_modules/csscomb/config/csscomb.json .csscomb.json
```

### Through `.css`-template

Instead of configuring all the options one by one, you can use a CSS-template file: CSSComb.js will detect the coding style and use it as a config. All existing properties except `sort-order` can be configured this way.

To provide a template just add `"template"` with the path to the template in the `.csscomb.json`:

```json
{
    "template": "example.css"
}
```

CSSComb.js will only create rules based on the examples given, so if your template doesn't provide examples of usage for some of the options, or if you want to override an example, you can write them in the `.csscomb.json` after the `"template"`:

```json
{
    "template": "example.css",
    "leading-zero": false,
    "vendor-prefix-align": true
}
```

This config would detect all the options from the `example.css`, and use `"leading-zero":  false` instead of anything detected, and `"vendor-prefix-align": true` even if there were no prefixed properties or values inside the `example.css`.

### Creating `.csscomb.json` from the `.css` file

If you want to configure everything manually, but based on the coding style of an existing `.css`-file, you can first detect all the options using `--detect` CLI option, and then add/edit any options you like. So if you have `example.css`:

```css
.foo
{
    width: #fff;
}
```

running

```bash
csscomb -d template.css > .csscomb.json
```

would generate this `.csscomb.json`:

```json
{
    "remove-empty-rulesets": true,
    "always-semicolon": true,
    "color-case": "lower",
    "color-shorthand": true,
    "strip-spaces": true,
    "eof-newline": true,
    "stick-brace": "\n",
    "colon-space": [
        "",
        " "
    ],
    "rule-indent": "    "
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
csscomb ./test

✓ test/integral.origin.css
  test/integral.expect.css

2 files processed
1 file fixed
96 ms spent
```

CLI mode:
```bash
csscomb --verbose ./test
csscomb -v ./test
```

### template

**Note:** see the description of the [configuring with templates](#through-css-template).

Available value: `{String}` path to the `.css` file.

Example: `{ "template": "example.css" }`

CLI mode — just provide the path to the `.css` file instead of `.csscomb.json`:
```bash
csscomb --config example.css ./test
csscomb -c example.css ./test
```

### always-semicolon

Whether to add a semicolon after the last value/mixin.

Available value: `{Boolean}` `true`

Example: `{ "always-semicolon": true }`

```css
/* before */
a { color: red }

/* after */
a { color: red; }
```

Example: `{ "always-semicolon": true }` (scss file):

```scss
// before
div {
    color: tomato;
    @include nani
    }

// after
div {
    color: tomato;
    @include nani;
    }
```

Note that in `*.scss` and `*.less` files semicolons are not added after `}`
even if it's part of a value:

```scss
// before
div {
    color: tomato;
    font: {
        family: fantasy;
        size: 16px
        }
    }

// after
div {
    color: tomato;
    font: {
        family: fantasy;
        size: 16px;
        }
    }
```

### block-indent

**Note**: better to use with [rule-indent](#rule-indent)

Acceptable values:
  * `{Number}` of spaces;
  * `{String}` of whitespaces or tabs. If there is any other character in the
    string, the value will not be set.

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

Example: `{ "block-indent": "  " }`

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

Acceptable values are of the form `{Array}` with 2 elements of the following types:
  * `{Number}` of spaces;
  * `{String}` of whitespaces or tabs. If there is any other character in the
    string, the value will not be set.

The first element of the array sets spaces before colon, and the second one sets
spaces after colon.

Example: `{ "colon-space": ["\t", "\t"] }`

```css
/* before */
a { color: red }

/* after */
a { color	:	red }
```

Example: `{ "colon-space": [0, 1] }`

```css
/* before */
a { color:red }

/* after */
a { color: red }
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

Acceptable value is `{Array}` with 2 elements of the following types:
  * `{Number}` of spaces;
  * `{String}` of whitespaces, tabs or new lines. If there is any other
    character in the string, the value will not be set.

The first element of the array sets spaces before combinator, and the second
one sets spaces after combinator.

Example: `{ "combinator-space": [" ", "\n"] }`

```css
/* before */
a>b { color: red }

/* after */
a >
b { color: red }
```

Example: `{ "combinator-space": [1, 1] }`

```css
/* before */
a>b { color: red }

/* after */
a > b { color: red }
```


### element-case

Acceptable values: `{String}` `lower` or `upper`

Example: `{ "element-case": "upper" }`

```css
/* before */
li > a { color: red }

/* after */
LI > A { color: red }
```

### eof-newline

Acceptable values: `{Boolean}` `true` or `false`

Example: `{ "eof-newline": true }`

`a { color: red }` &rarr; `a { color: red }\n`

Example: `{ "eof-newline": false }`

`a { color: red }\n` &rarr; `a { color: red }`

### leading-zero

Acceptable values: `{Boolean}` `true` or `false`

Example: `{ "leading-zero": false }`

```css
/* before */
p { padding: 0.5em }

/* after */
p { padding: .5em }
```

### quotes

Acceptable values: `{String}` `single` or `double`

Example: `{ "quotes": "single" }`

```css
/* before */
p[href^="https://"]:before { content: "secure" }

/* after */
p[href^='https://']:before { content: 'secure' }
```

### remove-empty-rulesets

Acceptable values: `{Boolean}` `true`

Example: `{ "remove-empty-rulesets": true }` - remove rulesets that have nothing but spaces.

`a { color: red; } p { /* hey */ } b { }` &rarr; `a { color: red; } p { /* hey */ } `

### rule-indent

**Note**: better to use with [block-indent](#block-indent)

Acceptable values:
  * `{Number}` of spaces;
  * `{String}` of whitespaces or tabs. If there is any other character in the
    string, the value will not be set.

Example: `{ "rule-indent": 2 }`

```css
/* before */
a { color:red; margin:0 }

/* after */
a {
  color:red;
  margin:0 }
```

Example: `{ "rule-indent": "  " }`

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

If you sort properties in `*.scss` or `*.less` files, you can use one of 3
keywords in your config:
  * `$variable` for variable declarations (e.g. `$var` in Sass or `@var` in LESS);
  * `$include` for included mixins (e.g. `@include ...` and `@extend ...` in Sass
    or `.mixin()` in LESS);
  * `$import` for `@import` rules.

Example: `{ "sort-order": [ [ "$variable" ], [ "$include" ], [ "top", "padding" ] ] }`

```scss
/* before */
p {
    padding: 0;
    @include mixin($color);
    $color: tomato;
    top: 0;
}

/* after */
p {
    $color: tomato;

    @include mixin($color);

    top: 0;
    padding: 0;
}
```

### stick-brace

Acceptable values:
  * `{Number}` of spaces;
  * `{String}` of whitespaces, tabs or newlines. If there is any other
    character in the string, the value will not be set.

Example: `{ "stick-brace": "\n" }`

```css
/* before */
a { color:red }

/* after */
a
{ color:red }
```

Example: `{ "stick-brace": 1 }`

```css
/* before */
a{ color:red }

/* after */
a { color:red }
```


### strip-spaces

Acceptable value: `{Boolean}` `true`

Example: `{ "strip-spaces": true }`

`a { color: red } \n \n \n` &rarr; `a { color: red }\n`

`a { color: red }\t` &rarr; `a { color: red }`

### unitless-zero

Acceptable value: `{Boolean}` `true`

Example: `{ "unitless-zero": true }`

```css
/* before */
img { border: 0px }

/* after */
img { border: 0 }
```

### vendor-prefix-align

Acceptable value: `{Boolean}` `true`

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

[@mishanga](https://github.com/mishanga),
[@tonyganch](https://github.com/tonyganch)

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
* https://github.com/tonyganch/gonzales-pe
* https://github.com/css/csso
* https://github.com/nzakas/parser-lib
