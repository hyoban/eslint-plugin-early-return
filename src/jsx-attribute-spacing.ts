import { createRule } from './utils'

export type MessageIds = 'jsxAttributeSpacing'
export type Options = []

const rule = createRule<Options, MessageIds>({
  name: 'jsx-attribute-spacing',
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description: 'Enforce consistent spacing around JSX attributes',
    },
    messages: {
      jsxAttributeSpacing: 'Expected space before and after JSX attribute',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXOpeningElement(node) {
        const { attributes } = node
        if (attributes.length <= 1)
          return
        for (const [index, attribute] of attributes.entries()) {
          const nextAttribute = attributes[index + 1]
          if (!nextAttribute)
            break
          const isSameLine = attribute.loc.end.line === nextAttribute.loc.start.line
          if (!isSameLine)
            continue

          const { range } = attribute
          const nextRange = nextAttribute.range
          const spaceBetween = nextRange[0] - range[1]
          if (spaceBetween !== 1) {
            context.report({
              node: nextAttribute,
              fix(fixer) {
                return fixer.replaceTextRange([range[1], nextRange[0]], ' ')
              },
              messageId: 'jsxAttributeSpacing',
            })
          }
        }
      },
    }
  },
})

export default rule
