const buildResolvers = require('./buildResolvers');
const buildPlugins = require('./buildPlugins');
const buildLoaders = require('./buildLoaders');
const buildDevServer = require('./buildDevServer');
const buildOptimization = require('./buildOptimization');

const getFileTemplateName = require('./utils');

/**
 * Webpack configuration entry
 *
 * @param {Object} options
 * @returns Object
 */
module.exports = function buildWebpack(options) {
	const { mode, port, paths } = options;

	const isDev = mode === 'development';
	const isProd = mode === 'production';

	return {
		mode: mode ?? 'development',
		entry: {
			index: paths.entry,
		},
		devtool: isDev ? 'inline-source-map' : false,
		resolve: buildResolvers(options),
		module: {
			rules: buildLoaders(options),
		},
		plugins: buildPlugins(options),
		devServer: isDev ? buildDevServer(options) : undefined,
		output: {
			path: paths.output,
			filename: `js/${getFileTemplateName(mode)}.js`,
			assetModuleFilename: `assets/${getFileTemplateName(mode)}[ext]`,
			clean: true,
		},
		optimization: buildOptimization(mode),
	};
};
