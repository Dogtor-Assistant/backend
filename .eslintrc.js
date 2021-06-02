// eslint-disable-next-line no-undef
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['simple-import-sort', '@typescript-eslint', 'sort-keys-fix'],
    rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        // Allow for return type inference (I'm lazy)
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'array-bracket-spacing': ['error', 'never'],
        'arrow-parens': ['error', 'as-needed'],
        'arrow-spacing': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': 'error',
        'dot-location': 'error',
        'dot-notation': 'error',
        'eol-last': 'error',
        'eqeqeq': [
            'error',
            'always',
            {
                'null': 'never',
            },
        ],
        'indent': [
            'error',
            4,
        ],
        'max-len': [
            'error',
            {
                code: 120,
                ignoreUrls: true,
            },
        ],
        'no-const-assign': 'error',
        'no-else-return': 'warn',
        'no-extra-parens': ['error', 'functions'],
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
            },
        ],
        'no-trailing-spaces' : [
            'error',
            {
                'skipBlankLines': true,
            },
        ],
        'no-useless-return': 'error',
        'no-var': 'error',
        'object-curly-spacing': [
            'error',
            'always',
            {
                arraysInObjects: false,
                objectsInObjects: false,
            },
        ],
        'prefer-template': 'warn',
        quotes: [
            2,
            'single',
            {
                allowTemplateLiterals: true,
                avoidEscape: true,
            },
        ],
        semi: ['error', 'always'],
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // Type imports
                    ['^.*\\u0000$'],
                    // internal components
                    ['^[A-Z]', '\\./[A-Z]'],
                    // hooks
                    ['^use[A-Z]', '\\./use[A-Z]'],
                    // relative imports
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                ],
            },
        ],
        'sort-keys-fix/sort-keys-fix': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                asyncArrow: 'always',
                named: 'never',
            },
        ],
        'space-in-parens': ['error', 'never'],
        'yoda': ['warn', 'never'],
    },
};
