import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from '@eslint-react/eslint-plugin'
import * as depend from 'eslint-plugin-depend'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import { plugin as ex } from 'eslint-plugin-exception-handling'
import pluginSecurity from 'eslint-plugin-security'
import stylistic from '@stylistic/eslint-plugin'
import hooksPlugin from 'eslint-plugin-react-hooks'

const relaxedRules = Object.fromEntries([
  ...Object.keys(eslintPluginUnicorn.configs['flat/all'].rules),
  ...Object.keys(stylistic.configs['recommended-flat'].rules),
].map(ruleName => [ruleName, 'off']))

export default [
  { ignores: ['dist/**', 'node_modules/**', 'convex/_generated/**', 'src/lib/helper.ts'] },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ...react.configs.strict,
  },
  depend.configs['flat/recommended'],
  eslintPluginUnicorn.configs['flat/all'],
  { plugins: { ex } },
  pluginSecurity.configs.recommended,
  stylistic.configs['recommended-flat'],
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    files: [
      'convex/**/*.{js,ts}',
      'src/admin/**/*.{js,jsx}',
      'src/data/projects.js',
      'src/components/about.jsx',
      'src/components/portfolio.jsx',
      'src/app.jsx',
      'src/main.jsx',
    ],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: relaxedRules,
  },
]
