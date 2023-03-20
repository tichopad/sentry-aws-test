import * as Sentry from '@sentry/serverless'
import { z } from 'zod'

const envSchema = z.object({
  FUNCTION_NAME: z.string(),
  SENTRY_DSN: z.string(),
  SENTRY_ENVIRONMENT: z.string(),
})
export default function configureSentry() {
  const env = envSchema.passthrough().parse(process.env)

  Sentry.AWSLambda.init({
    dsn: env.SENTRY_DSN,
    environment: env.SENTRY_ENVIRONMENT,
    tracesSampleRate: 1.0,
  })

  Sentry.configureScope((scope) => {
    scope.setTag('function_name', env.FUNCTION_NAME)
  })
}
