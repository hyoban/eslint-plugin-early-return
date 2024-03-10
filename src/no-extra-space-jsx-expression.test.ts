import { RuleTester } from '@typescript-eslint/rule-tester'
import dedent from 'dedent'

import noExtraSpaceJsxExpression from './no-extra-space-jsx-expression'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
})

ruleTester.run(
  'no-extra-space-jsx-expression',
  noExtraSpaceJsxExpression,
  {
    valid: [
      dedent`
        function OutputNode({ data }) {
          return (
            <div className="border rounded-md bg-white w-12 h-10">
              {data.handle?.map((h, i) => (
                <CustomHandle
                  key={i}
                  type="target"
                  position={Position.Left}
                  style={getHandleStyle(h.type, i)}
                  id={[handleIdIndicator, handleOutputIndicator, h.type, i].join(
                    separator,
                  )}
                  isValidConnection={(c) =>
                    h.type === c.sourceHandle?.split(separator).at(-2)
                  }
                  isConnectable={({ connectedEdges, handleId }) =>
                    !connectedEdges.some((e) => e.targetHandle === handleId)
                  }
                />
              ))}
            </div>
          );
        }      
      `,
    ],
    invalid: [
      {
        code: dedent`
          function OutputNode({ data }) {
            return (
              <div className="border rounded-md bg-white w-12 h-10">
                {
                     data.handle?.map((h, i) => (
                  <CustomHandle
                    key={  i  }
                    type="target"
                    position={   Position.Left}
                    style={getHandleStyle(h.type, i)}
                    id={ [handleIdIndicator, handleOutputIndicator, h.type, i].join(
                      separator,
                    )    }
                    isValidConnection={(c) =>
                      h.type === c.sourceHandle?.split(separator).at(-2)
                    }
                    isConnectable={({ connectedEdges, handleId }) =>
                      !connectedEdges.some((e) => e.targetHandle === handleId)
                    }
                  />
                ))   }
                {
                  1}
              </div>
            );
          }
        `,
        output: dedent`
          function OutputNode({ data }) {
            return (
              <div className="border rounded-md bg-white w-12 h-10">
                {data.handle?.map((h, i) => (
                  <CustomHandle
                    key={i}
                    type="target"
                    position={Position.Left}
                    style={getHandleStyle(h.type, i)}
                    id={[handleIdIndicator, handleOutputIndicator, h.type, i].join(
                      separator,
                    )}
                    isValidConnection={(c) =>
                      h.type === c.sourceHandle?.split(separator).at(-2)
                    }
                    isConnectable={({ connectedEdges, handleId }) =>
                      !connectedEdges.some((e) => e.targetHandle === handleId)
                    }
                  />
                ))}
                {1}
              </div>
            );
          }
        `,
        errors: [
          {
            line: 4,
            column: 7,
            messageId: 'noExtraSpaceJsxExpression',
          },
          {
            line: 4,
            column: 7,
            messageId: 'noExtraSpaceJsxExpression',
          },
          {
            line: 7,
            column: 15,
            messageId: 'noExtraSpaceJsxExpression',
          },
          {
            line: 7,
            column: 15,
            messageId: 'noExtraSpaceJsxExpression',
          },
          {
            line: 9,
            column: 20,
            messageId: 'noExtraSpaceJsxExpression',
          },
          {
            line: 9,
            column: 20,
            messageId: 'noExtraSpaceJsxExpression',
          },
          {
            line: 11,
            column: 14,
            messageId: 'noExtraSpaceJsxExpression',
          },
          {
            line: 11,
            column: 14,
            messageId: 'noExtraSpaceJsxExpression',
          },
          {
            line: 22,
            column: 7,
            messageId: 'noExtraSpaceJsxExpression',
          },
          {
            line: 22,
            column: 7,
            messageId: 'noExtraSpaceJsxExpression',
          },
        ],
      },
    ],
  },
)
