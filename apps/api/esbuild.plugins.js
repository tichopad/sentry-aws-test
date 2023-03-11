const { sentryEsbuildPlugin } = require('@sentry/esbuild-plugin')
const dotenv = require('dotenv')

dotenv.config({ path: '../../../.env' })

/** @type {(serverless: import('serverless')) => import('esbuild').BuildOptions['plugins']} */
module.exports = (serverless) => [
  // Put the Sentry esbuild plugin after all other plugins
  sentryEsbuildPlugin({
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
    // and need `project:releases` and `org:read` scopes
    authToken: process.env.SENTRY_AUTH_TOKEN,
    include: './.esbuild/.build',
    urlPrefix: '/var/task/',
  }),
]
