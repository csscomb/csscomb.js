# Command Line usage

To run `csscomb`:

```bash
csscomb path[ path[...]]
```

`path` can be either a directory or a file:

```bash
csscomb assets/css public/styles.css
```

If you installed the package locally, use local bin file instead:

```bash
./node_modules/.bin/csscomb assets/css public/styles.css
```

## Options

### help

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

### config

If you want to use custom config instead of predefined `csscomb.json` just
put a file named `.csscomb.json` to project's root (see [configuration
docs](configuration.md#where-to-put-config) for more information).
However, if for some reason you would like to use custom path, do it this way:

```bash
csscomb -c path/to/config styles.css
```

### detect

If you want to generate a config file based on a template file, run:

```bash
csscomb -d example.css > .csscomb.json
```

See [configuration docs](configuration.md#generate-config-from-a-template) for
more information.

### lint

CSScomb can be used as a linter, i.e. telling you what should be changed instead
of modifying anything.
This option should be combined with `--verbose`:

```bash
csscomb -lv assets/css

  assets/css/main.scss
! assets/css/main.scss
! assets/css/main.scss
! assets/css/main.scss

4 files processed
0 files fixed
spent: 30ms
```

Exclamation mark is a sign that something is wrong with the file.

### verbose

If you are curious or you just like a lot of output info, `--verbose` is your
good friend:

```bash
csscomb -v assets/css

  assets/css/main.scss
✓ assets/css/main.scss
✓ assets/css/main.scss
✓ assets/css/main.scss

4 files processed
3 files fixed
spent: 33ms
```
