describe('options/vendor-prefix-align', function() {
    beforeEach(function() {
        this.filename = __filename;
        this.comb.configure({ 'vendor-prefix-align': true });
    });

    it('Should correctly align prefixes in properties', function() {
        this.shouldBeEqual('property-align.css', 'property-align.expected.css');
    });

    it('Should correctly align prefixes in values', function() {
        this.shouldBeEqual('value-align.css', 'value-align.expected.css');
    });

    it('Should not touch already align prefixes', function() {
        this.shouldBeEqual('already-aligned.css', 'already-aligned.expected.css');
    });

    it('Should correct align prefixes in preoperties and values at the same time', function() {
        this.shouldBeEqual('both.css', 'both.expected.css');
    });

    it('Should correctly work when value and property name are the same', function() {
        this.shouldBeEqual('same-name.css', 'same-name.expected.css');
    });

    it('Should always correctly align prefixes', function() {
        this.shouldBeEqual('complex.css', 'complex.expected.css');
    });

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
