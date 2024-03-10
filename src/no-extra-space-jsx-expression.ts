// eslint-disable-next-line unused-imports/no-unused-imports
import type { ESLintUtils, TSESTree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule } from './utils'

export type MessageIds = 'noExtraSpaceJsxExpression'
export type Options = []

const expressionTypesNoCheck = new Set([
  AST_NODE_TYPES.ArrowFunctionExpression,
])

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
        expressionTypesNoCheck.has(expression.type)
      )
        return

      const containerRange = node.range
      const expressionRange = expression.range
      if (
        containerRange[1] - expressionRange[1] === 1
        && expressionRange[0] - containerRange[0] === 1
      )
        return

      const rangeToRemove: [number, number] = isExit
        ? [expressionRange[1], containerRange[1] - 1]
        : [containerRange[0] + 1, expressionRange[0]]

      context.report({
        node,
        loc: {
          start: context.sourceCode.getLocFromIndex(rangeToRemove[0]),
          end: context.sourceCode.getLocFromIndex(rangeToRemove[1]),
        },
        messageId: 'noExtraSpaceJsxExpression',
        fix: fixer => fixer.removeRange(rangeToRemove),
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
