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
        output: dedent`
          function foo() {
            if (!(x)) {
              return z;
            }
            console.log('hello')
          }
        `,
        errors: [
          {
            messageId: 'preferEarlyReturn',
            line: 4,
            column: 10,
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
        output: dedent`
          function foo() {
            if (!(x)) {
              throw new Error('error');
            }
            console.log('hello')
          }
        `,
        errors: [
          {
            messageId: 'preferEarlyReturn',
            line: 4,
            column: 10,
          },
        ],
      },
      {
        code: dedent`
          function foo() {
            if (x) console.log("hello");
            else throw new Error("error");
          }
        `,
        output: dedent`
          function foo() {
            if (!(x)) throw new Error("error");
            console.log("hello");
          }
        `,
        errors: [
          {
            messageId: 'preferEarlyReturn',
            line: 3,
            column: 8,
          },
        ],
      },
      {
        code: dedent`
          function foo() {
            for (const a of b) {
              if (x) console.log("hello");
              else continue
            }
          }
        `,
        output: dedent`
          function foo() {
            for (const a of b) {
              if (!(x)) continue
              console.log("hello");
            }
          }
        `,
        errors: [
          {
            messageId: 'preferEarlyReturn',
            line: 4,
            column: 10,
          },
        ],
      },
    ],
  },
)
