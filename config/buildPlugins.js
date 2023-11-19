const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getFileTemplateName = require('./utils');

module.exports = function buildPlugins({ mode, paths, pages }) {
	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const plugins = [
		...pages.map((page) => {
			return new HtmlWebpackPlugin({
				filename: `./${page.replace(/\.pug/, '.html')}`,
				template: `${paths.html}/${page}`,
				favicon: `${paths.srcPath}/assets/favicon.ico`,
			});
		}),
		new MiniCssExtractPlugin({
			filename: `assets/styles/${getFileTemplateName(mode)}.css`,
			chunkFilename: `assets/styles/${getFileTemplateName(mode)}.css`,
		}),
	];

	if (isProd) {
		plugins.push(new CssMinimizerPlugin());
	}

	return plugins;
};
