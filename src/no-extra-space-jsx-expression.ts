// eslint-disable-next-line unused-imports/no-unused-imports
import type { ESLintUtils, TSESTree } from '@typescript-eslint/utils'

import { createRule } from './utils'

export type MessageIds = 'noExtraSpaceJsxExpression'
export type Options = []

const rule = createRule<Options, MessageIds>({
  name: 'no-extra-space-jsx-expression',
  meta: {
    docs: {
      description: 'No extra space in jsx expression',
    },
    messages: {
      noExtraSpaceJsxExpression: 'No extra space in jsx expression',
    },
    type: 'layout',
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create() {
    return {}
  },
})

export default rule
