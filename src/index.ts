import { version } from '../package.json'
import jsoncInlineSpacing from './jsonc-inline-spacing'
import jsxAttributeSpacing from './jsx-attribute-spacing'
import preferEarlyReturn from './prefer-early-return'

export default {
  meta: {
    name: 'hyoban',
    version,
  },
  /// keep-sorted
  rules: {
    'jsonc-inline-spacing': jsoncInlineSpacing,
    'jsx-attribute-spacing': jsxAttributeSpacing,
    'prefer-early-return': preferEarlyReturn,
  },
}
