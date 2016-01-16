'use strict';

module.exports = function(string) {
  return string.replace(/\n\s+/gm, ' ');
};
