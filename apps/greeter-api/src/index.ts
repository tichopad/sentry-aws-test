import * as Sentry from '@sentry/serverless'
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { z } from 'zod'
import configureSentry from './configure-sentry'

configureSentry()

const eventBodySchema = z.object({
  name: z.string(),
})

// eslint-disable-next-line @typescript-eslint/require-await
const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  const rawEventBody = JSON.parse(event.body ?? '')
  const eventBody = eventBodySchema.parse(rawEventBody)
  const result = `Hey, ${eventBody.name}!`

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

export default Sentry.AWSLambda.wrapHandler(handler)
