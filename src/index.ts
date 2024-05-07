import { version } from '../package.json'
import jsxAttributeSpacing from './jsx-attribute-spacing'
import preferEarlyReturn from './prefer-early-return'

export default {
  meta: {
    name: 'hyoban',
    version,
  },
  rules: {
    'prefer-early-return': preferEarlyReturn,
    'jsx-attribute-spacing': jsxAttributeSpacing,
  },
}
