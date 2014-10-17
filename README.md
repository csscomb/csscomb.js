# CSScomb [![CSSComb](logo.png)](http://csscomb.com/)
[![Build Status](https://travis-ci.org/csscomb/csscomb.js.svg?branch=master)](http://travis-ci.org/csscomb/csscomb.js)
[![NPM version](https://badge.fury.io/js/csscomb.svg)](http://badge.fury.io/js/csscomb)
[![Dependency Status](https://david-dm.org/csscomb/csscomb.js.svg)](https://david-dm.org/csscomb/csscomb.js)
[![devDependency Status](https://david-dm.org/csscomb/csscomb.js/dev-status.svg)](https://david-dm.org/csscomb/csscomb.js#info=devDependencies)

CSScomb is a coding style formatter for CSS.
You can easily write your own [configuration](doc/configuration.md) to make
your style sheets beautiful and consistent.

The main feature is [sorting properties](doc/options.md#sort-order) in a specific order.
It was inspired by [@miripiruni](https://github.com/miripiruni)'s
[PHP-based tool](https://github.com/csscomb/csscomb) of the same name.
This is the new JavaScript version, based on the powerful CSS parser
[Gonzales PE](https://github.com/tonyganch/gonzales-pe).

## 1. Install

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

## 2. [Configure](doc/configuration.md)

There are a number of ways to configure CSScomb:

- Use one of [predefined configs](config)
- Put `.csscomb.json` file in the project root.
- Set path to config's file
- Use `*.css` file as a template

## 3. Use

### [Command Line](doc/usage-cli.md)

```bash
csscomb assets/css
```

### [Node.js module](doc/usage-node.md)

```js
var Comb = require('csscomb');
var comb = new Comb('zen');
comb.processPath('assets/css');
```

## 4. Contribute

Anyone and everyone is welcome to contribute.
Please take a moment to review the [guidelines for contributing](CONTRIBUTING.md).

## Authors

[@mishanga](https://github.com/mishanga),
[@tonyganch](https://github.com/tonyganch)

Thanks for assistance and contributions:

[@miripiruni](https://github.com/miripiruni),
[@anton-rudeshko](https://github.com/anton-rudeshko),
[@cvrebert](https://github.com/cvrebert),
[@filtercake](https://github.com/filtercake),
[@ignovak](https://github.com/ignovak),
[@kizu](https://github.com/kizu),
[@lefoy](https://github.com/lefoy),
[@L0stSoul](https://github.com/L0stSoul),
[@mishaberezin](https://github.com/mishaberezin),
[@puzankov](https://github.com/puzankov),
[@schneyra](https://github.com/schneyra),
[@thejameskyle](https://github.com/thejameskyle),
[@vecmezoni](https://github.com/vecmezoni)

## License

This software is released under the terms of the
[MIT license](https://github.com/csscomb/csscomb.js/blob/master/LICENSE).

## Other projects
* https://github.com/senchalabs/cssbeautify
* https://github.com/css/gonzales
* https://github.com/tonyganch/gonzales-pe
* https://github.com/css/csso
* https://github.com/nzakas/parser-lib
