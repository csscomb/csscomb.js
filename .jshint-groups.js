module.exports = {
    options: {
        globals: {
            afterEach: false,
            beforeEach: false,
            describe: false,
            it: false
        },
        eqeqeq: true,
        esnext: true,
        expr: true,
        forin: true,
        maxdepth: 5,
        maxparams: 3,
        noarg: true,
        nonew: true,
        trailing: true,
        undef: true,
        unused: true
    },
    groups: {
        src: {
            options: {
                node: true
            },
            includes: ['src/**/*.js']
        },
        test: {
            options: {
                node: true,
                predef: ['afterEach', 'beforeEach', 'describe', 'it']
            },
            includes: ['test/**/*.js']
        }
    }
};
