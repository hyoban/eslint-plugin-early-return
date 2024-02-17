import { ESLintUtils } from '@typescript-eslint/utils'

export const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/hyoban/eslint-plugin-early-return/blob/main/src/rules/${name}.`,
)
