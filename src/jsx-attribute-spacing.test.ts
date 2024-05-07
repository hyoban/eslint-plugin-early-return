import tsParser from '@typescript-eslint/parser'
import { run, unindent } from 'eslint-vitest-rule-tester'
import { expect } from 'vitest'

import jsxAttributeSpacing from './jsx-attribute-spacing'

run({
  name: 'jsx-attribute-spacing',
  rule: jsxAttributeSpacing,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  configs: [
    {
      files: ['**/*.ts', '**/*.js'],
      languageOptions: {
        parser: tsParser,
      },
    },
  ],
  valid: [
    'const element = <img src={user.avatarUrl} alt="hi" ></img>;',
    'const element = <img src={user.avatarUrl}    alt="hi" ></img>;',
    unindent`
      const element = (
        <img
          src={user.avatarUrl}
          alt="hi"
        ></img>
      );
    `,
    unindent`
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
                  isValidConnection={(c) => {
                    return h.type === c.sourceHandle?.split(separator).at(-2);
                  }}
                  isConnectable={({ connectedEdges, handleId }) =>
                    !connectedEdges.some((e) => e.targetHandle === handleId)
                  }
                />
              ))}
            </div>
          );
        }
      `,
    unindent`
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
                  fieldConfig={
                    (fieldConfig?.[name] ?? {}) as FieldConfig<
                      z.infer<typeof item>
                    >
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
      code: 'const element = <img src={user.avatarUrl}alt="hi" ></img>;',
      output(output) {
        expect(output).toMatchInlineSnapshot('"const element = <img src={user.avatarUrl} alt="hi" ></img>;"')
      },
      errors(errors) {
        expect(errors).toHaveLength(1)
      },
    },
    {
      code: unindent`
        const element = (
          <img
            src={user.avatarUrl}
            alt="hi"className="border"
          ></img>
        );
      `,
      output(output) {
        expect(output).toMatchInlineSnapshot(`
          "const element = (
            <img
              src={user.avatarUrl}
              alt="hi" className="border"
            ></img>
          );"
        `)
      },
      errors(errors) {
        expect(errors).toHaveLength(1)
      },
    },
    {
      code: unindent`
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
      output(output) {
        expect(output).toMatchInlineSnapshot(`
          "function OutputNode({ data }) {
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
          }"
        `)
      },
      errors(errors) {
        expect(errors).toHaveLength(8)
        expect(errors.map(e => e.messageId)).toMatchInlineSnapshot(`
          [
            "noExtraSpaceJsxExpression",
            "noExtraSpaceJsxExpression",
            "noExtraSpaceJsxExpression",
            "noExtraSpaceJsxExpression",
            "noExtraSpaceJsxExpression",
            "noExtraSpaceJsxExpression",
            "noExtraSpaceJsxExpression",
            "noExtraSpaceJsxExpression",
          ]
        `)
      },
    },
    {
      code: unindent`
          <CustomHandle
            isValidConnection={(c) => {
              return h.type === c.sourceHandle?.split(separator).at(-2);
            }                }
          />
        `,
      output(output) {
        expect(output).toMatchInlineSnapshot(`
          "<CustomHandle
            isValidConnection={(c) => {
              return h.type === c.sourceHandle?.split(separator).at(-2);
            }}
          />"
        `)
      },
      errors(errors) {
        expect(errors).toHaveLength(1)
        expect(errors.map(e => e.messageId)).toMatchInlineSnapshot(`
          [
            "noExtraSpaceJsxExpression",
          ]
        `)
      },
    },
  ],
})
