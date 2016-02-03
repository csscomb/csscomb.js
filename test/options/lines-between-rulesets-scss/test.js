/* global describe, it */
'use strict';

describe('options/lines-between-rulesets:scss', function() {
    it('Numeric value => should insert 1 newline between rulesets', function() {
        this.comb.configure({ 'lines-between-rulesets': 1 });
        return this.shouldBeEqual('lines-between-rulesets.scss', 'lines-between-rulesets.expected.scss');
    });

    it('Numeric value => should insert multiple newlines between rulesets', function() {
        this.comb.configure({ 'lines-between-rulesets': 2 });
        return this.shouldBeEqual('lines-between-rulesets.scss', '2-lines-between-rulesets.expected.scss');
    });

    it('Invalid string value => should should not change anything', function() {
        this.comb.configure({ 'lines-between-rulesets': '\n' });
        return this.shouldBeEqual('lines-between-rulesets.scss');
    });

    it('Float number value => should be rounded', function() {
        this.comb.configure({ 'lines-between-rulesets': 0.5 });
        return this.shouldBeEqual('lines-between-rulesets.scss', 'lines-between-rulesets.expected.scss');
    });
});
