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
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      IfStatement(node) {
        if (!node.alternate) {
          return
        }
        if (
          (
            node.alternate.type === AST_NODE_TYPES.ReturnStatement
            || node.alternate.type === AST_NODE_TYPES.ThrowStatement
          )
          || (
            node.alternate.type === AST_NODE_TYPES.BlockStatement
            && (node.alternate.body.some(statement =>
              statement.type === AST_NODE_TYPES.ReturnStatement
              || statement.type === AST_NODE_TYPES.ThrowStatement))
          )
        ) {
          context.report({
            node: node.alternate,
            messageId: 'preferEarlyReturn',
            fix(fixer) {
              const condition = context.sourceCode.getText(node.test)

              let ifText = context.sourceCode.getText(node.consequent)

              ifText = ifText.startsWith('{') && ifText.endsWith('}')
                ? ifText.replace(/^{/, '')
                  .replace(/}$/, '')
                  .replaceAll('\n  ', '\n')
                  .slice(1, -1)
                : `  ${ifText}`

              const elseText = context.sourceCode.getText(node.alternate!)

              return [
                fixer.replaceText(node, `if (!${condition}) ${elseText}\n${ifText}`),
              ]
            },
          })
        }
      },
    }
  },
})

export default rule
