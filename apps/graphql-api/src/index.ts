import * as Sentry from '@sentry/serverless'
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { graphql } from 'graphql'
import { z } from 'zod'
import configureSentry from './configure-sentry'
import schema from './schema'

configureSentry()

const eventBodySchema = z.object({
  query: z.string(),
  variables: z.record(z.any()).optional(),
})

const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
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

export default Sentry.AWSLambda.wrapHandler(handler)
