# Node.js module usage

CSScomb can be used in Node.js projects: inside a plugin or as a dev tool.

Workflow can look like this:

```js
// Require:
var Comb = require('csscomb');
var config = require('path/to/config');

// Configure:
var comb = new Comb(config);

// Use:
comb.processPath('style.css');
```

## new Comb(config)

Create instance's prototype.

Parameters:

* `{String|Object} config` — config that should be used after creating
   instance. Should be JSON or one of predefined config's name. Optional.

Example: Create CSScomb instance and configure it using predefined `yandex` sort
order

```js
var comb = new Comb('yandex');

// This is shortcut for:
var comb = new Comb();
var config = comb.getConfig('yandex');
comb.configure(config);
```

Example: Create CSScomb instance and configure it using config object

```js
var config = require('path/to/config');
var comb = new Comb(config);

// This is shortcut for:
var comb = new Comb();
comb.configure(config);
```

## getConfig(name)

Get one of predefined configs.

Parameters:

* `{String} name` — config's name. Should be one of the following:
  `csscomb`, `zen` or `yandex`.

Example: Configure CSScomb using predefined `zen` sort order that is slightly
modified.

```js
var config = comb.getConfig('zen');
config['always-semicolon'] = true;
comb.configure(config);
```

## configure(config)

Configure CSScomb.

Parameters:

* `{Object} config` — valid JSON object.

Example: Create and pass a config object to the method

```js
var config = { 'always-semicolon': true };
comb.configure(config);
```

Example: Use config stored in a file

```js
var config = require('path/to/.csscomb.json');
comb.configure(config);
```

See [configuration docs](configuration.md) for more information.

## processPath(path)

Comb a file or a directory.

Parameters:

* `{String} path` — path to file or directory

**Warning:** This method rewrites the file.

Example: Process one file

```js
comb.processPath('main.scss');
```

Example: Process whole directory

```js
comb.processPath('assets/css');
```

## processDirectory(path)

Comb all supported files in a directory.

Parameters:

* `{String} path` — path to a directory

**Warning:** This method rewrites the files.

Example:

```js
comb.processDirectory('public/css');
```

## processFile(path)

Comb one file.

Parameters:

* `{String} path` — path to a file

If file's syntax is not supported, the file will be ignored.

**Warning:** This method rewrites the file.

Example:

```js
comb.processFile('print.less');
```

## processString(string, syntax, filename)

Comb a stylesheet.

Parameters:

* `{String} text` — stylesheet that should be combed.
* `{String} syntax` — style's syntax. Optional. Default value is `css`.
* `{String} filename` — file's name that is used to print possible errors.
   Optional.

Example: Comb a css string

```js
var css = 'a {top: 0; left: 0}';
var combedCSS = comb.processString(css);
```

Example: Comb a less string

```js
var less = '@color: tomato; a {color: @color}';
var combedLESS = comb.processString(less, 'less');
```

## detectInFile(path, options)

Get config options that can be detected in a file.

Parameters:

* `{String} path` — path to stylesheet
* `{Array} options` — list of options to detect. Optional. By default tries
   to detect all available options.

Example: Configure CSScomb using template file

```js
var config = comb.detectInFile('template.css');
comb.configure(config);
```

## detectInString(string, options)

Get config options that can be detected in a string.

Parameters:

* `{String} string` — stylesheet
* `{Array} options` — list of options to detect. Optional. By default tries
   to detect all available options.

Example: Configure CSScomb using template stylesheet

```js
var css = 'a {top: 0; left: 0}';
var config = comb.detectInString(css);
comb.configure(config);
```
