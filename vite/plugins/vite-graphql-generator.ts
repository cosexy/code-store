import { exec } from 'child_process'
import { Plugin } from 'vite'

const _writeSchema = async () => {
  try {
    exec('npm run apollo:codegen')
  } catch (e) {
    console.log('> Try to pull schema from Apollo Studio')
    exec('npm run apollo:pull && npm run apollo:codegen')
  }
}

export default () => {
  const content: Plugin = {
    name: 'vite:graphql-generator',
    async handleHotUpdate (ctx) {
      if (/\/nuxt-admin\/apollo\/(queries|mutations)\/.*.(query|mutation).ts/.test(ctx.file)) {
        console.log('  > Generator graphql schema: ', ctx.file)
        await _writeSchema()
      }
    }
  }

  return content
}
