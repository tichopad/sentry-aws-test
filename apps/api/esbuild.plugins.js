// @ts-check
const { sentryEsbuildPlugin } = require('@sentry/esbuild-plugin')

/**
 * @typedef {import('serverless')} Serverless
 * @typedef {import('esbuild').BuildOptions['plugins']} ESBuildPlugins
 * @type {(serverless: Serverless) => ESBuildPlugins}
 */
module.exports = (serverless) =>
  process.env.START_SENTRY_RELEASE
    ? [
        // Put the Sentry esbuild plugin after all other plugins
        sentryEsbuildPlugin({
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
          include: './.esbuild/.build',
          urlPrefix: '/var/task/',
        }),
      ]
    : []
