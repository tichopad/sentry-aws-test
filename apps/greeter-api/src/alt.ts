import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import * as Sentry from '@sentry/serverless'
import configureSentry from './configure-sentry'

configureSentry()

// eslint-disable-next-line @typescript-eslint/require-await
const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  if (Math.random() > 0.5) {
    throw new Error(`A chaotic exception happened inside the handler.`)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hola!' }),
  }
}

export default Sentry.AWSLambda.wrapHandler(handler)
