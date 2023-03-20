// @ts-check
const { sentryEsbuildPlugin } = require('@sentry/esbuild-plugin')

/**
 * See https://github.com/floydspace/serverless-esbuild#options
 * @typedef {{
 *  concurrency?: number;
 *  disableIncremental?: boolean;
 *  exclude?: Array<string>;
 *  installExtraArgs?: Array<string>;
 *  keepOutputDirectory?: boolean;
 *  nativeZip?: boolean;
 *  outputBuildFolder?: string;
 *  outputFileExtension?: string;
 *  packagePath?: string;
 *  packager?: 'npm' | 'yarn' | 'pnpm';
 *  packagerOptions?: {
 *    scripts?: Array<string>;
 *    noInstall?: boolean;
 *  };
 *  watch?: {
 *    pattern?: string;
 *    ignore?: string;
 *    chokidar?: Record<string, any>;
 *  }
 * }} ServerlessESBuildPluginOptions
 * @typedef {import('serverless')} Serverless
 * See https://esbuild.github.io/api/#overview
 * @typedef {import('esbuild').BuildOptions} ESBuildOptions
 */

/**
 * ESBuild configuration for packaging Lambda services
 *
 * @type {(serverless: Serverless) => ESBuildOptions & ServerlessESBuildPluginOptions}
 */
module.exports = function serverlessEsbuildConfig(serverless) {
  const isReleaseCreated = Boolean(process.env.START_SENTRY_RELEASE)
  return {
    // serverless-esbuild options
    exclude: ['aws-sdk'],
    keepOutputDirectory: true,
    packager: 'pnpm',
    // esbuild options
    bundle: true,
    keepNames: true,
    minify: true,
    platform: 'node',
    plugins: [
      sentryEsbuildPlugin({
        project: serverless.service.getServiceName(),
        authToken: process.env.SENTRY_AUTH_TOKEN,
        include: './.esbuild/.build',
        urlPrefix: '/var/task/',
        dryRun: isReleaseCreated === false,
        silent: isReleaseCreated === false,
        deploy: {
          env: serverless.service.provider.stage,
        },
      }),
    ],
    sourcemap: true,
  }
}
