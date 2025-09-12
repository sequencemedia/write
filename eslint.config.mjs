import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/configs/recommended/merge'
import typescript from '@sequencemedia/eslint-config-typescript/configs/recommended/merge'

export default [
  standard({
    files: [
      '**/*.{mjs,cjs,mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  typescript({
    files: [
      '**/*.{mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        NodeJS: 'readonly'
      }
    }
  })
]
