const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = function buildOptimization({ mode }) {
	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const baseConfiguration = {
		moduleIds: 'deterministic',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	};

	if (isProd) {
		baseConfiguration.minimizer = [`...`, new CssMinimizerPlugin()];
	}

	if (isDev) {
		baseConfiguration.runtimeChunk = 'single';
	}

	return baseConfiguration;
};
