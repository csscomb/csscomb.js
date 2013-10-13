module.exports = {
    options: {
        eqeqeq: true,
        evil: true,
        expr: true,
        forin: true,
        immed: true,
        indent: 4,
        latedef: true,
        maxdepth: 5,
        maxlen: 120,
        maxparams: 4,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        quotmark: 'single',
        trailing: true,
        undef: true,
        unused: true
    },
    groups: {
        js: {
            options: { node: true },
            includes: ['lib/**/*.js']
        },
        test: {
            options: {
                node: true,
                predef: ['describe', 'beforeEach', 'afterEach', 'it']
            },
            includes: ['test/*.js']
        }
    }
};
