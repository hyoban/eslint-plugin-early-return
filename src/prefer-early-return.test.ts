import { RuleTester } from '@typescript-eslint/rule-tester'
import dedent from 'dedent'

import preferEarlyReturn from './prefer-early-return'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run(
  'prefer-early-return',
  preferEarlyReturn,
  {
    valid: [
      dedent`
        function foo() {
          if (!x) {
            return z;
          }
          console.log('hello')
        }
      `,
      dedent`
        function foo() {
          if (!x) {
            throw new Error('error');
          }
          console.log('hello')
        }
      `,
    ],
    invalid: [
      {
        code: dedent`
          function foo() {
            if (x) {
              console.log('hello')
            } else {
              return z;
            }
          }
        `,
        errors: [
          {
            messageId: 'preferEarlyReturn',
            line: 2,
            column: 3,
          },
        ],
      },
      {
        code: dedent`
          function foo() {
            if (x) {
              console.log('hello')
            } else {
              throw new Error('error');
            }
          }
        `,
        errors: [
          {
            messageId: 'preferEarlyReturn',
            line: 2,
            column: 3,
          },
        ],
      },
    ],
  },
)
