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
      dedent`
        function OutputNode({ data }) {
          return (
            <div className="border rounded-md bg-white w-12 h-10">
              {data.handle?.map((h, i) => (
                <CustomHandle
                  fallback={(
                    <Loading>
                      From filed
                      {itemName}
                    </Loading>
                  )}
                  options={
                    Array.isArray(fieldConfigItem.inputProps?.options)
                      ? fieldConfigItem.inputProps.options
                      : []
                  }
                />
              ))}
              {1}
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
            column: 8,
            messageId: 'noExtraSpaceJsxExpression',
            endLine: 5,
            endColumn: 12,
          },
          {
            line: 7,
            column: 16,
            messageId: 'noExtraSpaceJsxExpression',
            endLine: 7,
            endColumn: 18,
          },
          {
            line: 7,
            column: 19,
            messageId: 'noExtraSpaceJsxExpression',
            endLine: 7,
            endColumn: 21,
          },
          {
            line: 9,
            column: 21,
            messageId: 'noExtraSpaceJsxExpression',
            endLine: 9,
            endColumn: 24,
          },
          {
            line: 9,
            column: 37,
            messageId: 'noExtraSpaceJsxExpression',
            endLine: 9,
            endColumn: 37,
          },
          {
            line: 11,
            column: 15,
            messageId: 'noExtraSpaceJsxExpression',
            endLine: 11,
            endColumn: 16,
          },
          {
            line: 13,
            column: 12,
            messageId: 'noExtraSpaceJsxExpression',
            endLine: 13,
            endColumn: 16,
          },
          {
            line: 21,
            column: 9,
            messageId: 'noExtraSpaceJsxExpression',
            endLine: 21,
            endColumn: 12,
          },
          {
            line: 22,
            column: 8,
            messageId: 'noExtraSpaceJsxExpression',
            endLine: 23,
            endColumn: 9,
          },
          {
            line: 23,
            column: 10,
            messageId: 'noExtraSpaceJsxExpression',
            endLine: 23,
            endColumn: 10,
          },
        ],
      },
    ],
  },
)
