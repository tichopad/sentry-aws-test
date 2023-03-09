import SchemaBuilder from '@pothos/core'

const builder = new SchemaBuilder({})

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => 'world!',
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
