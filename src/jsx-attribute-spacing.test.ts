import tsParser from '@typescript-eslint/parser'
import { run, unindent } from 'eslint-vitest-rule-tester'
import { expect } from 'vitest'

import jsxAttributeSpacing from './jsx-attribute-spacing'

run({
  name: 'jsx-attribute-spacing',
  rule: jsxAttributeSpacing,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  configs: [
    {
      files: ['**/*.ts', '**/*.js'],
      languageOptions: {
        parser: tsParser,
      },
    },
  ],
  valid: [
    'const element = <img src={user.avatarUrl} alt="hi" ></img>;',
    unindent`
      const element = (
        <img
          src={user.avatarUrl}
          alt="hi"
        ></img>
      );
    `,
  ],
  invalid: [
    {
      code: 'const element = <img src={user.avatarUrl}alt="hi" ></img>;',
      output(output) {
        expect(output).toMatchInlineSnapshot('"const element = <img src={user.avatarUrl} alt="hi" ></img>;"')
      },
      errors(errors) {
        expect(errors).toHaveLength(1)
      },
    },
    {
      code: 'const element = <img src={user.avatarUrl}    alt="hi" ></img>;',
      output(output) {
        expect(output).toMatchInlineSnapshot('"const element = <img src={user.avatarUrl} alt="hi" ></img>;"')
      },
      errors(errors) {
        expect(errors).toHaveLength(1)
      },
    },
  ],
})
