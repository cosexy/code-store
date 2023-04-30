import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3002/graphql',
  documents: 'apollo/**/*.graphql',
  generates: {
    './apollo/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'graphql'
      },
      config: {
        useTypeImports: true
      }
    }
  },
  hooks: {
    afterAllFileWrite: ['eslint --fix --quiet ./apollo/__generated__/']
  }
}

export default config
