// eslint-disable-next-line unused-imports/no-unused-imports
import type { ESLintUtils, TSESTree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule } from './utils'

export type MessageIds = 'noExtraSpaceJsxExpression'
export type Options = []

const rule = createRule<Options, MessageIds>({
  name: 'no-extra-space-jsx-expression',
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description: 'No extra space in jsx expression',
    },
    messages: {
      noExtraSpaceJsxExpression: 'No extra space in jsx expression',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function check(node: TSESTree.JSXExpressionContainer, isExit?: boolean) {
      const { expression } = node
      if (
        expression.type !== AST_NODE_TYPES.CallExpression
        && expression.type !== AST_NODE_TYPES.ChainExpression
      )
        return

      const containerRange = node.range
      const expressionRange = expression.range
      if (
        containerRange[1] - expressionRange[1] === 1
        && expressionRange[0] - containerRange[0] === 1
      )
        return

      context.report({
        node,
        messageId: 'noExtraSpaceJsxExpression',
        fix(fixer) {
          return isExit
            ? fixer.removeRange([expressionRange[1], containerRange[1] - 1])
            : fixer.removeRange([containerRange[0] + 1, expressionRange[0]])
        },
      })
    }

    return {
      'JSXExpressionContainer:exit'(node) {
        check(node, true)
      },
      JSXExpressionContainer(node) {
        check(node)
      },
    }
  },
})

export default rule
