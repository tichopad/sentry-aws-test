import * as Sentry from '@sentry/serverless'

export default function configureSentry(dsn: string) {
  Sentry.AWSLambda.init({
    dsn,
    tracesSampleRate: 1.0,
  })
}
