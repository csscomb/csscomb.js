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
    "colon-space": true,
    "rule-indent": true,
    "block-indent": true,
    "stick-brace": true,
    "strip-spaces": true,
    "always-semicolon": true
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
[@L0stSoul](https://github.com/L0stSoul)

## License

This software is released under the terms of the [MIT license](https://github.com/csscomb/csscomb.js/blob/master/LICENSE).

## Other projects
* https://github.com/senchalabs/cssbeautify
* https://github.com/css/gonzales
* https://github.com/css/csso
