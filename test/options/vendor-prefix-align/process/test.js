describe.skip('options/vendor-prefix-align', function() {
    beforeEach(function() {
        this.comb.configure({ 'vendor-prefix-align': true });
    });

    describe('process', function() {
        it('Should correctly work when there is comment before property name', function() {
            return this.shouldBeEqual('with-comment-property.css', 'with-comment-property.expected.css');
        });

        it('Should correctly work when there is comment before property name. Test 2', function() {
            return this.shouldBeEqual('with-comment-property-2.css', 'with-comment-property-2.expected.css');
        });

        it('Should correctly work when there is comment before property name. Test 3', function() {
            return this.shouldBeEqual('multiline-comments.css', 'multiline-comments.expected.css');
        });

        it('Should correctly align prefixes in properties', function() {
            return this.shouldBeEqual('property-align.css', 'property-align.expected.css');
        });

        it('Should correctly align prefixes in values', function() {
            return this.shouldBeEqual('value-align.css', 'value-align.expected.css');
        });

        it('Should not touch already align prefixes', function() {
            return this.shouldBeEqual('already-aligned.css', 'already-aligned.expected.css');
        });

        it('Should correctly align prefixes in properties and values at the same time', function() {
            return this.shouldBeEqual('both.css', 'both.expected.css');
        });

        it('Should correctly work when value and property names are the same', function() {
            return this.shouldBeEqual('same-name.css', 'same-name.expected.css');
        });

        it('Should correctly work when there is no whitespace after colon', function() {
            return this.shouldBeEqual('without-space.css', 'without-space.expected.css');
        });

        it('Should correctly work when there is comment after colon', function() {
            return this.shouldBeEqual('with-comment.css', 'with-comment.expected.css');
        });

        it('Should not do anything with oneliners', function() {
            return this.shouldBeEqual('one-line.css', 'one-line.expected.css');
        });

        it('Should not do anything with oneliners. Test 2', function() {
            return this.shouldBeEqual('one-line-2.css', 'one-line-2.expected.css');
        });

        it('Should always correctly align prefixes', function() {
            return this.shouldBeEqual('complex.css', 'complex.expected.css');
        });

        it('Issue 193: should handle declarations without preceding spaces', function() {
            return this.shouldBeEqual('issue-193.css', 'issue-193.expected.css');
        });

        it('Issue 241: should not break tabs', function() {
            this.comb.configure({
                'block-indent': '\t',
                'vendor-prefix-align': true
            });
            return this.shouldBeEqual('issue-241.css', 'issue-241.expected.css');
        });
    });

    describe('detect', function() {
        it('Shouldn not detect anything if there are no prefixed groups', function() {
            this.shouldDetect(
                ['vendor-prefix-align'],
                'a{ color: red }a{ -webkit-transform: translateZ(0) }',
                {}
            );
        });

        it('Shouldn detect vendor-prefix-align as false in properties', function() {
            this.shouldDetect(
                ['vendor-prefix-align'],
                this.readFile('property-align.css'),
                {
                    'vendor-prefix-align': false
                }
            );
        });

        it('Shouldn detect vendor-prefix-align as true in properties', function() {
            this.shouldDetect(
                ['vendor-prefix-align'],
                this.readFile('property-align.expected.css'),
                {
                    'vendor-prefix-align': true
                }
            );
        });

        it('Shouldn detect vendor-prefix-align as false in values', function() {
            this.shouldDetect(
                ['vendor-prefix-align'],
                this.readFile('value-align.css'),
                {
                    'vendor-prefix-align': false
                }
            );
        });

        it('Shouldn detect vendor-prefix-align as true in values', function() {
            this.shouldDetect(
                ['vendor-prefix-align'],
                this.readFile('value-align.expected.css'),
                {
                    'vendor-prefix-align': true
                }
            );
        });

        it('Shouldn detect vendor-prefix-align as true, test 1', function() {
            this.shouldDetect(
                ['vendor-prefix-align'],
                this.readFile('already-aligned.css'),
                {
                    'vendor-prefix-align': true
                }
            );
        });

        it('Shouldn detect vendor-prefix-align as true, test 2', function() {
            this.shouldDetect(
                ['vendor-prefix-align'],
                this.readFile('complex.expected.css'),
                {
                    'vendor-prefix-align': true
                }
            );
        });

        it('Shouldn detect vendor-prefix-align as false', function() {
            this.shouldDetect(
                ['vendor-prefix-align'],
                this.readFile('complex.css'),
                {
                    'vendor-prefix-align': false
                }
            );
        });

        it('Should not detect anything in simple case', function() {
            this.shouldDetect(
                ['vendor-prefix-align'],
                'a{border:0;}',
                {}
            );
        });
    });
});
