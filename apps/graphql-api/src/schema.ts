import SchemaBuilder from '@pothos/core'
import TracingPlugin, { isRootField } from '@pothos/plugin-tracing'
import { createSentryWrapper } from '@pothos/tracing-sentry'

function delay(ms: number) {
  return new Promise<void>((ok) => {
    setTimeout(() => ok(), ms)
  })
}

const traceResolver = createSentryWrapper({
  includeArgs: true,
  includeSource: true,
})

export const builder = new SchemaBuilder({
  plugins: [TracingPlugin],
  tracing: {
    default: (config) => isRootField(config),
    wrap: (resolver, options) => traceResolver(resolver, options),
  },
})

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: async () => {
        await delay(Math.random() * 2000)
        return 'world!'
      },
    }),
    bye: t.string({
      args: {
        count: t.arg({
          type: 'Int',
          required: true,
        }),
      },
      resolve: (_, args) =>
        new Array(args.count)
          .fill(null)
          .map(() => 'Bye')
          .join('!'),
    }),
  }),
})

const schema = builder.toSchema()

export default schema
