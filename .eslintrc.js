module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        'accessor-pairs': 'error',
        'array-bracket-newline': 'error',
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'array-callback-return': 'off',
        'array-element-newline': 'off',
        'arrow-body-style': 'off',
        'arrow-parens': 'off',
        'arrow-spacing': [
            'error',
            {
                'after': true,
                'before': true
            }
        ],
        'block-scoped-var': 'error',
        'block-spacing': 'error',
        'brace-style': [
            'error',
            '1tbs'
        ],
        'callback-return': 'error',
        'camelcase': 'error',
        'capitalized-comments': 'off',
        'class-methods-use-this': 'off',
        'comma-dangle': 'error',
        'comma-spacing': [
            'error',
            {
                'after': true,
                'before': false
            }
        ],
        'comma-style': [
            'error',
            'last'
        ],
        'complexity': 'error',
        'computed-property-spacing': [
            'error',
            'never'
        ],
        'consistent-return': 'off',
        'consistent-this': 'error',
        'curly': 'off',
        'default-case': 'error',
        'dot-location': [
            'error',
            'property'
        ],
        'dot-notation': [
            'error',
            {
                'allowKeywords': true
            }
        ],
        'eol-last': 'error',
        'eqeqeq': 'error',
        'func-call-spacing': 'error',
        'func-name-matching': 'error',
        'func-names': 'off',
        'func-style': 'off',
        'function-paren-newline': 'error',
        'generator-star-spacing': 'error',
        'global-require': 'off',
        'guard-for-in': 'off',
        'handle-callback-err': 'error',
        'id-blacklist': 'error',
        'id-length': 'off',
        'id-match': 'error',
        'implicit-arrow-linebreak': [
            'error',
            'beside'
        ],
        'indent': 'off',
        'indent-legacy': 'off',
        'init-declarations': 'off',
        'jsx-quotes': 'error',
        'key-spacing': 'error',
        'keyword-spacing': [
            'error',
            {
                'after': true,
                'before': true
            }
        ],
        'line-comment-position': 'off',
        'linebreak-style': [
            'error',
            'unix'
        ],
        'lines-around-comment': 'off',
        'lines-around-directive': 'error',
        'lines-between-class-members': [
            'error',
            'always'
        ],
        'max-classes-per-file': 'error',
        'max-depth': 'error',
        'max-len': 'error',
        'max-lines': 'off',
        'max-lines-per-function': 'error',
        'max-nested-callbacks': 'error',
        'max-params': 'error',
        'max-statements': 'off',
        'max-statements-per-line': 'error',
        'multiline-comment-style': [
            'error',
            'separate-lines'
        ],
        'multiline-ternary': 'off',
        'new-cap': 'error',
        'new-parens': 'error',
        'newline-after-var': 'off',
        'newline-before-return': 'off',
        'newline-per-chained-call': 'off',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-async-promise-executor': 'error',
        'no-await-in-loop': 'error',
        'no-bitwise': 'error',
        'no-buffer-constructor': 'error',
        'no-caller': 'error',
        'no-catch-shadow': 'error',
        'no-confusing-arrow': 'error',
        'no-continue': 'off',
        'no-div-regex': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': 'off',
        'no-empty-function': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-extra-parens': 'error',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-inline-comments': 'off',
        'no-inner-declarations': [
            'error',
            'functions'
        ],
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'off',
        'no-loop-func': 'error',
        'no-magic-numbers': 'off',
        'no-misleading-character-class': 'error',
        'no-mixed-operators': 'off',
        'no-mixed-requires': 'error',
        'no-multi-assign': 'off',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-multiple-empty-lines': 'error',
        'no-native-reassign': 'error',
        'no-negated-condition': 'off',
        'no-negated-in-lhs': 'error',
        'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-require': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'off',
        'no-path-concat': 'off',
        'no-plusplus': 'off',
        'no-process-env': 'off',
        'no-process-exit': 'off',
        'no-proto': 'error',
        'no-prototype-builtins': 'off',
        'no-restricted-globals': 'error',
        'no-restricted-imports': 'error',
        'no-restricted-modules': 'error',
        'no-restricted-properties': 'error',
        'no-restricted-syntax': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'off',
        'no-shadow-restricted-names': 'error',
        'no-spaced-func': 'error',
        'no-sync': 'off',
        'no-tabs': 'error',
        'no-template-curly-in-string': 'error',
        'no-ternary': 'off',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'off',
        'no-underscore-dangle': 'off',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unused-expressions': 'error',
        'no-use-before-define': 'off',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'off',
        'no-void': 'error',
        'no-warning-comments': 'off',
        'no-whitespace-before-property': 'error',
        'no-with': 'error',
        'nonblock-statement-body-position': [
            'error',
            'any'
        ],
        'object-curly-newline': 'error',
        'object-curly-spacing': [
            'error',
            'never'
        ],
        'object-shorthand': 'off',
        'one-var': 'off',
        'one-var-declaration-per-line': 'error',
        'operator-assignment': [
            'error',
            'always'
        ],
        'operator-linebreak': [
            'error',
            'after'
        ],
        'padded-blocks': 'off',
        'padding-line-between-statements': 'error',
        'prefer-arrow-callback': 'off',
        'prefer-const': 'off',
        'prefer-destructuring': 'off',
        'prefer-named-capture-group': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': [
            'error',
            {
                'allowEmptyReject': true
            }
        ],
        'prefer-reflect': 'off',
        'prefer-rest-params': 'error',
        'prefer-spread': 'off',
        'prefer-template': 'off',
        'quote-props': 'off',
        'quotes': [
            'error',
            'single'
        ],
        'radix': [
            'error',
            'as-needed'
        ],
        'require-atomic-updates': 'error',
        'require-await': 'error',
        'require-jsdoc': 'off',
        'require-unicode-regexp': 'off',
        'rest-spread-spacing': 'error',
        'semi': 'error',
        'semi-spacing': [
            'error',
            {
                'after': true,
                'before': false
            }
        ],
        'semi-style': [
            'error',
            'last'
        ],
        'sort-imports': 'error',
        'sort-keys': 'off',
        'sort-vars': 'off',
        'space-before-blocks': 'error',
        'space-before-function-paren': 'off',
        'space-in-parens': [
            'error',
            'never'
        ],
        'space-infix-ops': 'off',
        'space-unary-ops': 'error',
        'spaced-comment': [
            'error',
            'always'
        ],
        'strict': 'error',
        'switch-colon-spacing': 'error',
        'symbol-description': 'error',
        'template-curly-spacing': [
            'error',
            'never'
        ],
        'template-tag-spacing': 'error',
        'unicode-bom': [
            'error',
            'never'
        ],
        'valid-jsdoc': 'off',
        'vars-on-top': 'off',
        'wrap-iife': 'error',
        'wrap-regex': 'error',
        'yield-star-spacing': 'error',
        'yoda': [
            'error',
            'never'
        ]
    }
};
