# Configuration options

There are a number of options you can use, all of them are switched off by
default.  
Here is a full list in the same order they are applied while processing css:

- [remove-empty-rulesets](#remove-empty-rulesets)
- [always-semicolon](#always-semicolon)
- [color-case](#color-case)
- [color-shorthand](#color-shorthand)
- [element-case](#element-case)
- [leading-zero](#leading-zero)
- [quotes](#quotes)
- [strip-spaces](#strip-spaces)
- [eof-newline](#eof-newline)
- [space-after-combinator](#space-after-combinator)
- [space-before-combinator](#space-before-combinator)
- [space-before-colon](#space-before-colon)
- [space-after-colon](#space-after-colon)
- [space-before-opening-brace](#space-before-opening-brace)
- [space-after-opening-brace](#space-after-opening-brace)
- [space-before-selector-delimiter](#space-before-selector-delimiter)
- [space-after-selector-delimiter](#space-after-selector-delimiter)
- [space-after-declaration](#space-after-declaration)
- [block-indent](#block-indent)
- [sort-order-fallback](#sort-order-fallback)
- [sort-order](#sort-order)
- [space-before-closing-brace](#space-before-closing-brace)
- [tab-size](#tab-size)
- [unitless-zero](#unitless-zero)
- [vendor-prefix-align](#vendor-prefix-align)

Following options are ignored while processing `*.sass` files:

- always-semicolon
- space-before-opening-brace
- space-after-opening-brace
- space-before-closing-brace
- space-after-declaration


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

Set indent for code inside blocks, including media queries and nested rules.

Acceptable values:

* `{Number}` — number os whitespaces;
* `{String}` — string with whitespaces and tabs. Note that line breaks are not
    allowed here.

Example: `{ 'block-indent': 4 }`

```scss
// Before:
a {
top: 0;
  p {
      color: tomato;
position: happy;
 }
}

// After:
a {
    top: 0;
    p {
        color: tomato;
        position: happy;
        }
    }
```

Example: `{ 'block-indent': '' }`

```scss
// Before:
a {
top: 0;
  p {
      color: tomato;
position: happy;
 }
}

// After:
a {
top: 0;
p {
color: tomato;
position: happy;
}
}
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

### sort-order vs. leftovers

When there are properties that are not mentioned in the `sort-order` option, they are inserted after all the sorted properties in the new group in the same order they were in the source stylesheet.

You can override this by using a “leftovers” token: `...` — just place it either in its own group, or near other properties in any other group and CSSComb would place all the properties that were not sorted where the `...` was in `sort-order`.

So, with this value:

``` json
{
    "sort-order": [
        ["$variable"],
        ["position"],
        ["...", "border"],
        ["$include"],
        ["font"]
    ]
}
```

everything would go into five groups: variables, then group with `position`, then group containing all the leftovers plus the `border`, then group with all includes and then the `font`.

## sort-order-fallback

Apply a special sort order for properties that are not specified in `sort-order`
list.  
Works great with [leftovers](#sort-order-vs-leftovers).  
**Note:** This option is applied only if [sort order](#sort-order) list is
provided.

Acceptable values:

* `abc` - sort unknown options alphabetically.

Example: `{ 'sort-order-fallback': 'abc', 'sort-order': ['top'] }`

```scss
// Before:
a {
    height: 100px;
    color: tomato;
    top: 0;
}

// After:
a {
    top:0;

    color:tomato;
    height: 100px;
}
```

Example: `{ 'sort-order-fallback': 'abc', 'sort-order': ['...'] }`

```scss
// Before:
a {
    height: 100px;
    color: tomato;
    top: 0;
}

// After:
a {
    color:tomato;
    height: 100px;
    top:0;
}
```

## space-after-colon

Set space after `:` in declarations.

Acceptable values:

* `{Number}` — number of whitespaces;
* `{String}` — string with whitespaces, tabs or line breaks.

Example: `{ 'space-after-colon': '' }`

```scss
// Before:
a {
    top: 0;
    color: tomato;
}

// After:
a {
    top:0;
    color:tomato;
}
```

Example: `{ 'space-after-colon': 1 }`

```scss
// Before:
a {
    top:0;
    color:tomato;
}

// After:
a {
    top: 0;
    color: tomato;
}
```

## space-after-combinator

Set space after combinator (for example, in selectors like `p > a`).

Acceptable values:

* `{Number}` — number of whitespaces;
* `{String}` — string with whitespaces, tabs or line breaks.

Example: `{ 'space-after-combinator': 1 }`

```scss
// Before:
p>a { color: panda; }

// After:
p> a { color: panda; }
```

Example: `{ 'space-after-combinator': '\n  ' }`

```scss
// Before:
p > a { color: panda; }

// After:
p >
  a { color: panda; }
```

## space-after-declaration

Set space after declaration (i.e. `color: tomato`).

Acceptable values:

* `{Number}` — number of whitespaces;
* `{String}` — string with whitespaces, tabs or line breaks.

Example: `{ 'space-after-declaration': 1 }`

```scss
// Before:
a {
    color: panda;
    top: 0;
    /* comment */
    right: 0;
    position: absolute
    }

// After:
a {
    color: panda; top: 0; /* comment */
    right: 0; position: absolute }
```

Example: `{ 'space-after-declaration': '\n  ' }`

```scss
// Before:
a {
  color: panda; top: 0; right: 0}

// After:
a {
  color: panda;
  top: 0;
  right: 0;
  }
```


## space-after-opening-brace

Set space after `{`.

Acceptable values:

* `{Number}` — number of whitespaces;
* `{String}` — string with whitespaces, tabs or line breaks.

Example: `{ 'space-after-opening-brace': 1 }`

```scss
// Before:
a {color: panda;}

// After:
a { color: panda;}
```

Example: `{ 'space-after-opening-brace': '\n' }`

```scss
// Before:
a{color: panda;}

// After:
a{
color: panda;}
```

## space-after-selector-delimiter

Set space after selector delimiter.

Acceptable values:

* `{Number}` — number of whitespaces;
* `{String}` — string with whitespaces, tabs or line breaks.

Example: `{ 'space-after-selector-delimiter': 1 }`

```scss
// Before:
a,b{
    color: panda;
    }

// After:
a, b {
    color: panda;
    }
```

Example: `{ 'space-after-selector-delimiter': '\n' }`

```scss
// Before:
a, b{
    color: panda;
    }

// After:
a,
b{
    color: panda;
    }
```

## space-before-closing-brace

Set space before `}`.

Acceptable values:

* `{Number}` — number of whitespaces;
* `{String}` — string with whitespaces, tabs or line breaks.

Example: `{ 'space-before-closing-brace': 1 }`

```scss
// Before:
a {
    top: 0;
    color: tomato;
}

// After:
a {
    top: 0;
    color: tomato; }
```

Example: `{ 'space-before-closing-brace': '\n' }`

```scss
// Before:
a {
    top: 0;
    color: tomato;}

// After:
a {
    top: 0;
    color: tomato;
}
```

## space-before-colon

Set space before `:` in declarations.

Acceptable values:

* `{Number}` — number of whitespaces;
* `{String}` — string with whitespaces, tabs or line breaks.

Example: `{ 'space-before-colon': '' }`

```scss
// Before:
a {
    top : 0;
    color : tomato;
}

// After:
a {
    top: 0;
    color: tomato;
}
```

Example: `{ 'space-before-colon': 1 }`

```scss
// Before:
a {
    top:0;
    color:tomato;
}

// After:
a {
    top :0;
    color :tomato;
}
```

## space-before-combinator

Set space before combinator (for example, in selectors like `p > a`).

Acceptable values:

* `{Number}` — number of whitespaces;
* `{String}` — string with whitespaces, tabs or line breaks.

Example: `{ 'space-before-combinator': 1 }`

```scss
// Before:
p>a { color: panda; }

// After:
p >a { color: panda; }
```

Example: `{ 'space-before-combinator': '\n' }`

```scss
// Before:
p > a { color: panda; }

// After:
p
> a { color: panda; }
```

## space-before-opening-brace

Set space before `{`.

Acceptable values:

* `{Number}` — number of whitespaces;
* `{String}` — string with whitespaces, tabs or line breaks.

Example: `{ 'space-before-opening-brace': 1 }`

```scss
// Before:
a{
    color: panda;
    }

// After:
a {
    color: panda;
    }
```

Example: `{ 'space-before-opening-brace': '\n' }`

```scss
// Before:
a{
    color: panda;
    }

// After:
a
{
    color: panda;
    }
```

## space-before-selector-delimiter

Set space before selector delimiter.

Acceptable values:

* `{Number}` — number of whitespaces;
* `{String}` — string with whitespaces, tabs or line breaks.

Example: `{ 'space-before-selector-delimiter': 0 }`

```scss
// Before:
a , b{
    color: panda;
    }

// After:
a, b {
    color: panda;
    }
```

Example: `{ 'space-before-selector-delimiter': '\n' }`

```scss
// Before:
a, b{
    color: panda;
    }

// After:
a
,b{
    color: panda;
    }
```

## strip-spaces

Whether to trim trailing spaces.

Acceptable value: `true`.

Example: `{ "strip-spaces": true }`

`a { color: red } \n \n \n` &rarr; `a { color: red }\n`

`a { color: red }\t` &rarr; `a { color: red }`

## tab-size

Set tab size (number of spaces to replace hard tabs).

Acceptable values:

* `{Number}` — number of whitespaces;

Example: `{ 'tab-size': 2 }`

```scss
// Before:
a{
	color: panda;
	}

// After:
a {
  color: panda;
  }
```

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
