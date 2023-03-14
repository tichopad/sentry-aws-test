import * as Sentry from '@sentry/serverless'

export default function configureSentry(dsn: string, serviceName: string) {
  Sentry.AWSLambda.init({
    dsn,
    dist: serviceName,
    tracesSampleRate: 1.0,
    serverName: serviceName,
  })
}
