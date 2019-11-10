module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/recommended', '@vue/airbnb'],
    rules: {
        "vue/html-indent": ['error', 2],
        'vue/max-attributes-per-line': 'off',
        // 'vue/singleline-html-element-content-newline': 'off',
        'indent': ['error', 2],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
