import * as Sentry from '@sentry/serverless'

export default function configureSentry(dsn: string) {
  Sentry.AWSLambda.init({
    dsn,
    profilesSampleRate: 1.0,
    tracesSampleRate: 1.0,
  })
}
