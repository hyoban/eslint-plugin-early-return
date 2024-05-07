import dedent from 'dedent'
import { run } from 'eslint-vitest-rule-tester'
import { expect } from 'vitest'

import preferEarlyReturn from './prefer-early-return'

run({
	name: 'prefer-early-return',
	rule: preferEarlyReturn,
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
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
			output(output) {
				expect(output).toMatchInlineSnapshot(`
					"function foo() {
					  if (!x) {
					    return z;
					  }
					  console.log('hello')
					}"
				`)
			},
			errors(errors) {
				expect(errors).toHaveLength(1)
				expect(errors.map((e) => e.messageId)).toMatchInlineSnapshot(
					`
					[
					  "preferEarlyReturn",
					]
				`,
				)
			},
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
			output(output) {
				expect(output).toMatchInlineSnapshot(`
          "function foo() {
            if (!x) {
              throw new Error('error');
            }
            console.log('hello')
          }"
        `)
			},
			errors(errors) {
				expect(errors).toHaveLength(1)
				expect(errors.map((e) => e.messageId)).toMatchInlineSnapshot(`
          [
            "preferEarlyReturn",
          ]
        `)
			},
		},
		{
			code: dedent`
          function foo() {
            if (x) console.log("hello");
            else throw new Error("error");
          }
        `,
			output(output) {
				expect(output).toMatchInlineSnapshot(`
					"function foo() {
					  if (!x) throw new Error("error");
					  console.log("hello");
					}"
				`)
			},
			errors(errors) {
				expect(errors).toHaveLength(1)
				expect(errors.map((e) => e.messageId)).toMatchInlineSnapshot(`
            [
              "preferEarlyReturn",
            ]
          `)
			},
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
			output(output) {
				expect(output).toMatchInlineSnapshot(`
					"function foo() {
					  for (const a of b) {
					    if (!x) continue
					    console.log("hello");
					  }
					}"
				`)
			},
			errors(errors) {
				expect(errors).toHaveLength(1)
				expect(errors.map((e) => e.messageId)).toMatchInlineSnapshot(`
            [
              "preferEarlyReturn",
            ]
          `)
			},
		},
		{
			code: dedent`
          function foo() {
            for (const a of b) {
              if (x || y) console.log("hello");
              else continue
            }
          }
        `,
			output(output) {
				expect(output).toMatchInlineSnapshot(`
					"function foo() {
					  for (const a of b) {
					    if (!(x || y)) continue
					    console.log("hello");
					  }
					}"
				`)
			},
			errors(errors) {
				expect(errors).toHaveLength(1)
				expect(errors.map((e) => e.messageId)).toMatchInlineSnapshot(`
            [
              "preferEarlyReturn",
            ]
          `)
			},
		},
	],
})
