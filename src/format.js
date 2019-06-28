'use strict';

module.exports = function(string) {
  return string.replace(/\r?\n\s+/g, ' ');
};
