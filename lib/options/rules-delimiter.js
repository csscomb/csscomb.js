module.exports = {
    name: 'rules-delimiter',

    syntax: ['scss'],

    runBefore: "strip-spaces",

    setValue: function(value) {
        if (typeof value === 'number') {
            value =  Array(value + 2).join('\n');
        }

        return value;
    },

    process: function(nodeType, node) {
        var value = this.getValue('rules-delimiter'),
            currentNode,
            previousNode;

        for(var i = node.length; i--;) {
            currentNode = node[i];
            previousNode = node[i - 1];

            if(currentNode[0] === 'ruleset' && previousNode) {
                if(previousNode[0] === 's') {
                    if (node[i - 2] && (node[i - 2][0] === 'commentSL' || node[i - 2][0] === 'commentML')) continue;

                    node[i - 1][1] = previousNode[1].replace(/\n*/, value);
                }
            }
        }
    }
};
