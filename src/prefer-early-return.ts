// eslint-disable-next-line unused-imports/no-unused-imports
import type { ESLintUtils } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule } from './utils'

export type MessageIds = 'preferEarlyReturn'
export type Options = []

const rule = createRule<Options, MessageIds>({
  name: 'prefer-early-return',
  meta: {
    docs: {
      description: 'Prefer early return pattern to clean if else statement',
    },
    messages: {
      preferEarlyReturn: 'Return early to clean this if else statement',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      IfStatement(node) {
        if (!node.alternate) {
          return
        }
        if (
          node.alternate.type === AST_NODE_TYPES.BlockStatement
          && node.alternate.body.some(statement =>
            statement.type === AST_NODE_TYPES.ReturnStatement
            || statement.type === AST_NODE_TYPES.ThrowStatement,
          )
        ) {
          context.report({
            node,
            messageId: 'preferEarlyReturn',
          })
        }
      },
    }
  },
})

export default rule
