import stylistic from '@stylistic/eslint-plugin';
import pluginVitest from '@vitest/eslint-plugin';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import { globalIgnores } from 'eslint/config';
import { rules as importXRules } from 'eslint-plugin-import-x';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    plugins: {
      stylistic,
    },
    rules: {
      'stylistic/indent': ['error', 2],
      'stylistic/semi': ['error', 'always'],
      'stylistic/arrow-parens': ['error', 'always'],
      'stylistic/brace-style': ['error', '1tbs'],
      'stylistic/quotes': ['error', 'single'],
      'stylistic/quote-props': ['error', 'consistent-as-needed'],
      'stylistic/comma-dangle': ['error', 'always-multiline'],
      'stylistic/comma-spacing': ['error', { before: false, after: true }],
    },
  },

  pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/block-tag-newline': ['error', {
        singleline: 'always',
        multiline: 'always',
      }],
      'vue/component-api-style': ['error', ['script-setup', 'composition']],

    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  vueTsConfigs.recommended,

  {
    plugins: {
      import: {
        rules: {
          order: importXRules.order,
        },
      },
    },
    rules: {
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      }],
    },
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
);
