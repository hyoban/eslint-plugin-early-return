import { version } from '../package.json'
import jsxAttributeSpacing from './jsx-attribute-spacing'
import noExtraSpaceJsxExpression from './no-extra-space-jsx-expression'
import preferEarlyReturn from './prefer-early-return'

export default {
  meta: {
    name: 'hyoban',
    version,
  },
  rules: {
    'prefer-early-return': preferEarlyReturn,
    'no-extra-space-jsx-expression': noExtraSpaceJsxExpression,
    'jsx-attribute-spacing': jsxAttributeSpacing,
  },
}
