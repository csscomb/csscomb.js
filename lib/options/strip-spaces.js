module.exports = (function() {
    /**
     * Trim trailing spaces on each line.
     * @private
     * @param {String} string Spaceful string
     * @returns {String}
     */
    function trim(string) {
        return string.replace(/[ \t]+\n/g, '\n');
    }

    return {
        name: 'strip-spaces',

        syntax: ['css', 'less', 'sass', 'scss'],

        accepts: { boolean: [true] },

        /**
         * Processes tree node.
         * @param {node} node
         */
        process: function(node) {
            if (node.is('space')) {
                node.content = trim(node.content);
            } else if (node.is('stylesheet')) {
                var lastChild = node.last();
                if (lastChild.is('space')) {
                    lastChild.content = trim(lastChild.content)
                        .replace(/[ \t]+$/, '')
                        .replace(/[\n]+/g, '\n');
                }
            }
        },

        detectDefault: true,

        /**
         * Detects the value of an option at the tree node.
         * This option is treated as `true` by default, but any trailing space would invalidate it.
         *
         * @param {node} node
         */
        detect: function(node) {
            if (node.is('space') &&
                node.content.match(/[ \t]\n/)) {
                return false;
            } else if (node.is('stylesheet')) {
                var lastChild = node.last();
                if (lastChild.is('space') &&
                    lastChild.content !== '\n' &&
                    lastChild.content.match(/^[ \n\t]+$/)) {
                    return false;
                }
            }
        }
    };
})();
