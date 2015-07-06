/* global describe, it */
'use strict';

describe('options/lines-between-rulesets:less', function() {
    it('Numeric value => should insert 1 newline between rulesets', function() {
        this.comb.configure({ 'lines-between-rulesets': 1 });
        return this.shouldBeEqual('lines-between-rulesets.less', 'lines-between-rulesets.expected.less');
    });

    it('Invalid string value => should should not change anything', function() {
        this.comb.configure({ 'lines-between-rulesets': '\n' });
        return this.shouldBeEqual('lines-between-rulesets.less');
    });

    it('Float number value => should be rounded', function() {
        this.comb.configure({ 'lines-between-rulesets': 0.5 });
        return this.shouldBeEqual('lines-between-rulesets.less', 'lines-between-rulesets.expected.less');
    });
});