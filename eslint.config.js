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

export default [
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
]
