/* global describe, it */
'use strict';

describe('options/rule-delimiter:scss', function() {
    it('String value => should insert 1 newline between rulesets', function() {
        this.comb.configure({ 'rule-delimiter': '\n\n' });
        this.shouldBeEqual('rule-delimiter.scss', 'rule-delimiter.expected.scss');
    });

    it('Numeric value => should insert 1 newline between rulesets', function() {
        this.comb.configure({ 'rule-delimiter': 1 });
        this.shouldBeEqual('rule-delimiter.scss', 'rule-delimiter.expected.scss');
    });

    it('Invalid string value => should should not change anything', function() {
        this.comb.configure({ 'rule-delimiter': 'foo' });

        this.shouldBeEqual('rule-delimiter.scss');
    });

    it('Float number value => should be rounded', function() {
        this.comb.configure({ 'rule-delimiter': 0.5 });
        this.shouldBeEqual('rule-delimiter.scss', 'rule-delimiter.expected.scss');
    });
});
