import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import * as Sentry from '@sentry/serverless'
import configureSentry from './configure-sentry'

configureSentry()

// eslint-disable-next-line @typescript-eslint/require-await
const handler: APIGatewayProxyHandlerV2 = async (event, context) => ({
  statusCode: 200,
  body: JSON.stringify({ message: 'Hello!' }),
})

export default Sentry.AWSLambda.wrapHandler(handler)
