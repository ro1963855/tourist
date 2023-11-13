/* eslint-env node */
// https://stylelint.io/migration-guide/to-14/

module.exports = {
  plugins: [
    // https://stylelint.io/migration-guide/to-15#deprecated-stylistic-rules
    'stylelint-stylistic',
  ],
  extends: [
    'stylelint-config-standard-scss',
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|html|vue)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    // rules: https://stylelint.io/user-guide/rules#avoid-errors
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'deep',
        ],
      },
    ],
    'alpha-value-notation': 'number',
    'at-rule-no-unknown': null,
    'color-function-notation': 'legacy',
    'no-descending-specificity': null,
    'color-hex-length': 'long',
    'selector-class-pattern': [
      // fixed by: https://github.com/stylelint/stylelint-config-standard/blob/main/index.js
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$|^el-.*$',
      {
        message: (selector) => `Expected class selector "${selector}" to be kebab-case`,
      },
    ],

    // rules: https://github.com/elirasza/stylelint-stylistic/tree/main#2-rules
    'stylistic/indentation': 2,
    'stylistic/color-hex-case': 'upper',
    'stylistic/no-eol-whitespace': true,
    'stylistic/string-quotes': 'double',
    'stylistic/block-opening-brace-space-before': 'always',
    'stylistic/selector-combinator-space-after': 'always',
    'stylistic/selector-combinator-space-before': 'always',

    // rules: https://github.com/stylelint-scss/stylelint-scss#list-of-rules
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
        ],
      },
    ],
    'scss/double-slash-comment-empty-line-before': [
      'always',
      {
        ignore: ['inside-block'],
      },
    ],
  },
};
