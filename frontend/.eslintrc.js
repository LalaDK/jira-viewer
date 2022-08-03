// .eslintrc.js
module.exports = {
  extends: ['plugin:vue/recommended', 'plugin:prettier-vue/recommended'],

  settings: {
    'prettier-vue': {
      SFCBlocks: {
        template: false,
        script: false,
        style: false,
        customBlocks: {
          docs: { lang: 'markdown' },
          config: { lang: 'json' },
          module: { lang: 'js' },
          comments: false,
        },
      },

      usePrettierrc: true,
      fileInfoOptions: {
        ignorePath: '.testignore',
        withNodeModules: false,
      },
    },
  },

  rules: {
    'prettier-vue/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
      },
    ],
  },
}
