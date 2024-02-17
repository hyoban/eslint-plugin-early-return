// eslint-disable-next-line unused-imports/no-unused-imports
import type { ESLintUtils } from '@typescript-eslint/utils'

import { version } from '../package.json'
import preferEarlyReturn from './prefer-early-return'

export default {
  meta: {
    name: 'early-return',
    version,
  },
  rules: {
    'prefer-early-return': preferEarlyReturn,
  },
}
