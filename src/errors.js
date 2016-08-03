'use strict';


let format = require('./format');

module.exports = {
  configParsingError(configPath) {
    return `Error parsing configuration file ${configPath}.`;
  },

  implementSetValue(valueType) {
    if (typeof valueType === 'undefined') throw new Error();

    return format(`If you see this message and you are not
        a developer adding a new option, please open an issue here:
        https://github.com/csscomb/core/issues/new\n
        For option to accept values of type "${valueType}"
        you need to implement custom \`setValue()\` method.`);
  },

  missingName() {
    return 'Plugin must have a valid \`name\` property.';
  },

  missingSetValue() {
    return format(`Plugin must either implemet \`setValue()\` method
        or provide \`accepts\` object with acceptable values.`);
  },

  missingSyntax() {
    return 'Plugin must list supported syntaxes.';
  },

  missingTemplateFile(file) {
    return format(`Template configuration file ${file}
                   was not found.`);
  },

  twoPluginsWithSameName(pluginName) {
    if (typeof pluginName === 'undefined') throw new Error();

    return format(`You're trying to use one plugin twice:
        ${pluginName}. Please make sure there are not two different
        plugins with the same name.`);
  },

  unacceptableBoolean(pattern) {
    if (typeof pattern === 'undefined') throw new Error();

    return `Value must be one of the following: ${pattern.join(', ')}.`;
  },

  unacceptableNumber() {
    return 'Value must be an integer.';
  },

  unacceptableString(pattern) {
    if (typeof pattern === 'undefined') throw new Error();

    return `Value must match pattern ${pattern}.`;
  },

  unacceptableValueType(valueType, accepts) {
    if (typeof valueType === 'undefined' ||
        typeof accepts === 'undefined') throw new Error();

    return format(`The option does not accept values of type
        ${valueType}.\nValue\'s type must be one the following:
        ${Object.keys(accepts).join(', ')}.`);
  }
};
