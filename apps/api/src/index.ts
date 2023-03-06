import type { APIGatewayEvent } from 'aws-lambda'
import SchemaBuilder from '@pothos/core'
import { graphql } from 'graphql'
import { z } from 'zod'

const eventBodySchema = z.object({
  query: z.string(),
  variables: z.record(z.any()).optional(),
})

const builder = new SchemaBuilder({})
builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => 'world',
    }),
    bye: t.string({
      args: {
        count: t.arg({
          type: 'Int',
          required: true,
        }),
      },
      resolve: (_, args) => {
        return new Array(args.count)
          .fill(null)
          .map(() => 'Bye')
          .join('!')
      },
    }),
  }),
})
const schema = builder.toSchema()

export const handler = async (event: APIGatewayEvent) => {
  const rawEventBody = JSON.parse(event.body ?? '')
  const eventBody = eventBodySchema.parse(rawEventBody)
  const result = await graphql({
    schema,
    source: eventBody.query,
    variableValues: eventBody.variables,
  })
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}
