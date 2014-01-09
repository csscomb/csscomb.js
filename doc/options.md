# Configuration options

There are a number of options you can use, all of them are switched off by
default.

## always-semicolon

Whether to add a semicolon after the last value/mixin.

Acceptable value: `true`.

Example: `{ "always-semicolon": true }`

```css
/* before */
a { color: red }

/* after */
a { color: red; }
```

### always-semicolon vs. preprocessors

In `*.scss` and `*.less` files semicolons are not added after `}`
even if it's part of a value.

Example: `{ "always-semicolon": true }`

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

## block-indent

**Note**: This option should be used together with [rule-indent](#rule-indent).

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

## colon-space

Set spaces around `:`.

Acceptable value is `{Array}` with 2 elements of the following types:

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


## color-case

Unify case of hexadecimal colors.

Acceptable values:

* `lower` — for lowercase,
* `upper` — for uppercase.

Example: `{ "color-case": "lower" }`

```css
/* before */
a { color: #FFF }

/* after */
a { color: #fff }
```

## color-shorthand

Whether to expand hexadecimal colors or use shorthands.

Acceptable values:

* `true` — use shorthands;
* `false` — expand hexadecimal colors to 6 symbols.

Example: `{ "color-shorthand": true }`

```css
/* before */
b { color: #ffcc00 }

/* after */
b { color: #fc0 }
```

Example: `{ "color-shorthand": false }`

```css
/* before */
b { color: #fc0 }

/* after */
b { color: #ffcc00 }
```

## combinator-space

Set spaces around combinator.

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


## element-case

Unify case of element selectors.

Acceptable values:

* `lower` — for lowercase;
* `upper` — for uppercase.

Example: `{ "element-case": "upper" }`

```css
/* before */
li > a { color: red }

/* after */
LI > A { color: red }
```

## eof-newline

Add/remove line break at EOF.

Acceptable values:

* `true` — add line break;
* `false` – remove line break.

Example: `{ "eof-newline": true }`

`a { color: red }` &rarr; `a { color: red }\n`

Example: `{ "eof-newline": false }`

`a { color: red }\n` &rarr; `a { color: red }`

## exclude

List files that should be ignored while combing.

Acceptable value:

* `{String[]}` — array of
  [Ant path patterns](http://ant.apache.org/manual/dirtasks.html#patterns).

Example: `{ "exclude": ["node_modules/**"] }` — exclude all files and
directories under `node_modules` dir.

## leading-zero

Add/remove leading zero in dimensions.

Acceptable values:

    * `true` — add leading zero;
    * `false` — remove leading zero.

Example: `{ "leading-zero": false }`

```css
/* before */
p { padding: 0.5em }

/* after */
p { padding: .5em }
```

## quotes

Unify quotes style.

Acceptable values:

* `single` — transform all `"` to `'`;
* `double` — transform all `'` to `"`.

Example: `{ "quotes": "single" }`

```css
/* before */
p[href^="https://"]:before { content: "secure" }

/* after */
p[href^='https://']:before { content: 'secure' }
```

## remove-empty-rulesets

Remove all rulesets that contain nothing but spaces.

Acceptable value: `true`

Example: `{ "remove-empty-rulesets": true }`.

`a { color: red; } p { /* hey */ } b { }` &rarr; `a { color: red; } p { /* hey */ } `

## rule-indent

**Note**: This option should be used together with [block-indent](#block-indent).

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

## sort-order

Set sort order.

**Note**: Use one of [predefined
configs](https://github.com/csscomb/csscomb.js/tree/master/config)
as an example.

Acceptable values:

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

### sort-order vs. preprocessors

If you sort properties in `*.scss` or `*.less` files, you can use one of 3
keywords in your config:

* `$variable` — for variable declarations (e.g. `$var` in Sass or `@var` in LESS);
* `$include` — for included mixins (e.g. `@include ...` and `@extend ...` in Sass
   or `.mixin()` in LESS);
* `$import` — for `@import` rules.

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

## stick-brace

Set spaces before `{`.

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

## strip-spaces

Whether to trim trailing spaces.

Acceptable value: `true`.

Example: `{ "strip-spaces": true }`

`a { color: red } \n \n \n` &rarr; `a { color: red }\n`

`a { color: red }\t` &rarr; `a { color: red }`

## template

**Note:** See [configuration docs](configuration.md#override-templates-settings)
for more information.

Acceptable value:

* `{String}` — path to the `.css` file.

Example: `{ "template": "example.css" }`

## unitless-zero

Whether to remove units in zero-valued dimensions.

Acceptable value: `true`.

Example: `{ "unitless-zero": true }`

```css
/* before */
img { border: 0px }

/* after */
img { border: 0 }
```

## vendor-prefix-align

Whether to align prefixes in properties and values.

Acceptable value: `true`.

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

## verbose

Whether to use `--verbose` option in CLI.

Acceptable value: `true`.

Example: `{ "verbose": true }`

```bash
csscomb ./test

✓ test/integral.origin.css
  test/integral.expect.css

2 files processed
1 file fixed
96 ms spent
```
