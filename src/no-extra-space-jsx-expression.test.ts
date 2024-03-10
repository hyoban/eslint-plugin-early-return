import { RuleTester } from '@typescript-eslint/rule-tester'

import noExtraSpaceJsxExpression from './no-extra-space-jsx-expression'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run(
  'no-extra-space-jsx-expression',
  noExtraSpaceJsxExpression,
  {
    valid: [

    ],
    invalid: [

    ],
  },
)
