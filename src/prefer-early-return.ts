// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ESLintUtils, TSESTree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule } from './utils'

export type MessageIds = 'preferEarlyReturn'
export type Options = []

function isConditionRevertNeedBracket(node: TSESTree.Node) {
	return !(
		node.type === AST_NODE_TYPES.Identifier ||
		node.type === AST_NODE_TYPES.Literal ||
		node.type === AST_NODE_TYPES.MemberExpression ||
		node.type === AST_NODE_TYPES.CallExpression
	)
}

function getIndentation(node: TSESTree.Node) {
	return ' '.repeat(node.loc.start.column)
}

function isNodeNeedEarlyReturn(node: TSESTree.Node) {
	return (
		node.type === AST_NODE_TYPES.ReturnStatement ||
		node.type === AST_NODE_TYPES.ThrowStatement ||
		node.type === AST_NODE_TYPES.ContinueStatement
	)
}

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
				if (!node.alternate) return

				if (
					isNodeNeedEarlyReturn(node.alternate) ||
					(node.alternate.type === AST_NODE_TYPES.BlockStatement &&
						node.alternate.body.some((statement) =>
							isNodeNeedEarlyReturn(statement),
						))
				) {
					context.report({
						node: node.alternate,
						messageId: 'preferEarlyReturn',
						fix(fixer) {
							const condition = context.sourceCode.getText(node.test)
							const revertCondition = isConditionRevertNeedBracket(node.test)
								? `!(${condition})`
								: `!${condition}`

							let ifText = context.sourceCode.getText(node.consequent)

							ifText =
								ifText.startsWith('{') && ifText.endsWith('}')
									? ifText
											.replace(/^{/, '')
											.replace(/}$/, '')
											.replaceAll('\n  ', '\n')
											.slice(1, -1)
									: `${getIndentation(node)}${ifText}`

							const elseText = context.sourceCode.getText(node.alternate!)

							return [
								fixer.replaceText(
									node,
									`if (${revertCondition}) ${elseText}\n${ifText}`,
								),
							]
						},
					})
				}
			},
		}
	},
})

export default rule
