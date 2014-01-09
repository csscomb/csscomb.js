# Configuration

You must configure CSScomb before use.
There are a number of ways how you can do it.

## Use one of predefined configs

There are [several config
files](https://github.com/csscomb/csscomb.js/tree/master/config)
included in this project you can use right away:

- `csscomb`
- `zen`
- `yandex`

In CLI, `csscomb` is a default config file that is used unless you provide your
own.
In Node.js, you can pass config's name to constructor:

```js
var Comb = require('csscomb');
var comb = new Comb('yandex');
```

Feel free to use predefined configs as examples: copy one of them and modify to
your taste.
Just remember to save the file as `.csscomb.json` in project's root.

## Create custom config

You can easily write your own configuration.
The only requirement is that config is valid JSON in order to work correctly.

Here is an example:

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

Take a look at [available options](options.md) and choose those you need.

### Where to put config

CSScomb will look for a file named `.csscomb.json`.
The best way is to put the file in your project's root.
However, if you want to use one config for several projects, it's fine to put
the file inside a parent folder.
CSScomb will look for a config file recursively up untill it reaches your
`HOME` directory.

Remember that you can always set custom path.
In CLI:
```bash
csscomb -c path/to/config assets/css
```

In Node.js:
```js
var Comb = require('csscomb');
var config = require('path/to/config');
var comb = new Comb(config);
```

## Generate config from a template

Instead of configuring all the options one by one, you can use a template file:
CSScomb will detect the coding style and use it as a config.
All existing properties except `sort-order` can be configured this way:

```bash
csscomb -d example.css > .csscomb.json
```

This will create `.csscomb.json` based on options that can be detected in
`example.css` file.

Let's say your template file has following content:

```css
.foo
{
    width: #fff;
}
```

Generated config wiil then look this way:

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


## Override template's settings

You can use template inside existing config and then complete it or override
some of detected settings:

```json
{
    "template": "example.css",
    "leading-zero": false,
    "vendor-prefix-align": true
}
```

This config will:

1. detect all the options from the `example.css`,
1. then use `"leading-zero":  false` instead of anything detected,
1. then use `"vendor-prefix-align": true` even if there were no prefixed
properties or values inside the `example.css`.
