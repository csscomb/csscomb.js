# Changelog

## 3.0.0 - 2014-07-19
**Thanks to
[@cvrebert](https://github.com/cvrebert),
[@filtercake](https://github.com/filtercake),
[@lefoy](https://github.com/lefoy),
[@L0stSoul](https://github.com/L0stSoul),
[@kizu](https://github.com/kizu),
[@schneyra](https://github.com/schneyra),
[@thejameskyle](https://github.com/thejameskyle),
[@vecmezoni](https://github.com/vecmezoni)**

New:

- Sass support
- Leftovers (#160)
- Use [CSScomb Core](https://github/csscomb/core)
- Plugins API (with `.use()` method)
- `sort-order-fallback` (alphabetical sort order)
- `space-before-colon`
- `space-after-colon`
- `space-before-combinator`
- `space-after-combinator`
- `space-before-selector-delimiter`
- `space-after-selector-delimiter`
- `space-before-opening-brace`
- `space-after-opening-brace`
- `space-before-closing-brace`
- `space-after-declaration`
- `tab-size`

Removed:

- `colon-space`
- `combinator-space`
- `rule-indent`
- `stick-brace`

Changed:

- Divided `process` and `detect` methods
- Made `getConfig` and `detect` static methods
- Removed "best guess" logic from options
- Excluded `bower_components/**` from processing
- Updated badges at README page
- Update Gonzales PE to v3.0
- Various fixes

## 2.0.5 - 2014-06-09
- Updated dependencies (#229)

## 2.0.4 - 2014-01-16
- Fixed relative path to config (#164)

## 2.0.3 - 2014-01-16
- Documentation moved to `doc` directory
- Fixed incorrect left indent (#153)

## 2.0.2 - 2014-01-09
- Added test coverage (#138)
- Added test helpers (#147)
- Fixed config file recursive searching (#151)
- Fixed `block-indent` detecting (#148)
- Fixed `quote` value setter (#149)
- Fixed detection integral tests (#150)

## 2.0.1 - 2013-12-23
- Fix for `remove-empty-rulesets` option (#133)

## 2.0.0 - 2013-12-18
**Great thanks for @tonyganch and @kizu!**
- Use Gonzales PE to parse *.scss and *.less files
- Support sorting properties in *.scss and *.less files
- Codestyle detection
- Option: always-semicolon (scss + less)
- Option: quotes
- Two more config examples now: `csscomb` and `zen`
- Lots of refactoring and fixes
- Lots of tests added
- Node v0.8 no longer supported

## 1.0.0 - 2013-11-06
- Option: vendor-prefix-align
- Dependencies updated
- Fixed options order in readme

## 0.1.0 - 2013-10-11
- CLI: lint mode

## 0.0.15 - 2013-10-03
- Option: remove-empty-rulesets (#67)
- Option colon-space expanded
- Some refactoring and fixes

## 0.0.14 - 2013-09-12
- Option: eof-newline (#55)
- Verbose option (#62)
- Some refactoring

## 0.0.13 - 2013-09-12
- Fixed failing on empty files (#66)

## 0.0.12 - 2013-09-11
- Option: combinator-space
- Readme update
- Some CLI fixes
- Contributor added: @anton-rudeshko

## 0.0.11 - 2013-09-10
- Option: element-case
- Fixed block-indent bug with space after at-rule opening brace
- Fixed JSDoc
- Fixed colon-space description

## 0.0.10 - 2013-09-06
- Option: color-case
- Option: color-shorthand
- Option: leading-zero
- Option: unitless-zero
- Option update: colon-space
- Contributors added: @kizu and @ignovak
- Readme updated
- Licence added
- Contributing info added
- Changelog added

## 0.0.9 - 2013-08-28
- Option: sort-order
- Sort order config fix
- JSCS version and config update
- jshint config fix
- Some codestyle fixes

## 0.0.8 - 2013-08-22
- !!! Now using Gonzales instead of CSSP
- Option: block-indent
- Option: rule-indent
- Added few links to README
- Added some debug info
- Fixed default sort order
- Fixed path processing bug
- Fixed stick-brace option

## 0.0.7 - 2013-08-09
- jshint config fix
- Codestyle fix for always-semicolon
- Integral test fix
- Removed old php code

## 0.0.6 - 2013-08-08
- Option: always-semicolon

## 0.0.5 - 2013-08-08
- Fix for value setting
- Bugfix for stick-brace
- Added integral test

## 0.0.4 - 2013-08-07
- Some refactoring
- Tests added

## 0.0.3 - 2013-08-05
- Option: colon-space
- Option: stick-brace
- Moved to github/csscomb/csscomb.js

## 0.0.2 - 2013-08-04
- Option: strip-spaces - fix

## 0.0.1 - 2013-08-03
- Initial release
- Option: strip spaces
- Travis support
