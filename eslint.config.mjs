import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/merge'
import typescript from '@sequencemedia/eslint-config-typescript/merge'

export default [
  ...standard({
    files: [
      '**/*.{mjs,cjs,mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  ...typescript({
    files: [
      '**/*.{mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        KeyFileType: 'readonly',
        FileType: 'readonly',
        FileListType: 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/max-params': ['error', { max: 5 }]
    }
  })
]
