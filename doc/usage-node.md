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
var config = Comb.getConfig('yandex');
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

## Comb.getConfig(name)

Get one of predefined configs.

Note that this is a static method.

Parameters:

* `{String} name` — config's name. Should be one of the following:
  `csscomb`, `zen` or `yandex`.

Example: Configure CSScomb using predefined `zen` sort order that is slightly
modified.

```js
var config = Comb.getConfig('zen');
config['always-semicolon'] = true;
comb.configure(config);
```

## Comb.detectInFile(path, options)

Get config options that can be detected in a file.

Note that this is a static method.

Parameters:

* `{String} path` — path to stylesheet
* `{Array} options` — list of options to detect. Optional. By default tries
   to detect all available options.

Example: Configure CSScomb using template file

```js
var config = comb.detectInFile('template.css');
comb.configure(config);
```

## Comb.detectInString(string, options)

Get config options that can be detected in a string.

Note that this is a static method.

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

## Public methods

For the list of public methods and examples of their usage, see [CSScomb Core docs](https://github.com/csscomb/core).

