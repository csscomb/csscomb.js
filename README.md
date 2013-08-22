# Tool for beautify CSS

## Installation

```
npm install csscomb
```

To run `csscomb`, you can use the following command from the project root:

```
./node_modules/.bin/csscomb path[ path[...]]
```

```
$ ./node_modules/.bin/csscomb --help

  Usage: csscomb [options] <file ...>

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -c, --config [path]  configuration file path
```

## Configuration

`csscomb` is configured using `.csscomb.json` file, located in the project root.

Example configuration:

```javascript
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

## Other projects
* https://github.com/senchalabs/cssbeautify
* http://www.codebeautifier.com
* https://github.com/css/gonzales
* https://github.com/css/csso
