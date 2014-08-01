module.exports = {
    name: 'rules-delimiter',
 
    syntax: ['scss'],
 
    runBefore: "strip-spaces",
 
    setValue: function(value) {
        if (typeof value === 'number') {
            value =  Array(value + 1).join('\n');
        }
 
        return value;
    },
 
    process: function(nodeType, node) {
        var value = this.getValue('rules-delimiter'),
            currentNode,
            previousNode;
 
        for(var i = node.length; i--;) {
            currentNode = node[i];
            previousNode = node[i - 1]

            if(currentNode[0] === 'ruleset' && previousNode) {
                if(previousNode[0] !== 's' ||
                    (node[i-2] && node[i-2][0] !== 'commentML' && node[i-2][0] !== 'commentSL')) {
                    console.log('Changing ', currentNode[0], ' because of ', previousNode);

                    node.splice(i - 1, 0, ['s', value]);
                }
            }
        }
    }
};