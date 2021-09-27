module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-alert': 0,
        'no-tabs': ['error', { allowIndentationTabs: true }],
        'class-methods-use-this': 0,
        'no-continue': 0,
        'no-mixed-operators': 0,
        'no-restricted-syntax': 0,
        'import/no-named-as-default-member': 0,
        'comma-dangle': ['error', 'never'],
        camelcase: [0, { properties: 'always' }],
        'spaced-comment': [0, 'always'],
        'func-names': 0,
        'no-await-in-loop': 0,
        radix: 0,
        indent: ['error', 4],
        semi: [2, 'never'],
        'space-before-function-paren': ['error', 'always'],
        'template-curly-spacing': ['error', 'always'],
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'arrow-body-style': ['error', 'always'],
        'max-len': ['error', 240, 4, { ignoreUrls: true, ignoreTrailingComments: true }],
        'import/extensions': 0,
        'vue/html-indent': ['error', 4, {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
            ignores: []
        }]
    }
}
