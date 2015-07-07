/* global describe, it */
'use strict';

describe.skip('options/lines-between-rulesets:css', function() {
    it('Numeric value => should insert 1 newline between rulesets', function() {
        this.comb.configure({ 'lines-between-rulesets': 1 });
        return this.shouldBeEqual('lines-between-rulesets.css', 'lines-between-rulesets.expected.css');
    });

    it('Invalid string value => should should not change anything', function() {
        this.comb.configure({ 'lines-between-rulesets': '\n' });
        return this.shouldBeEqual('lines-between-rulesets.css');
    });

    it('Float number value => should be rounded', function() {
        this.comb.configure({ 'lines-between-rulesets': 0.5 });
        return this.shouldBeEqual('lines-between-rulesets.css', 'lines-between-rulesets.expected.css');
    });
});