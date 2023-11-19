const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getFileTemplateName = require('./utils');

module.exports = function buildLoaders({ mode }) {
	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const loaders = [pugLoader(), imageLoader(mode), mediaLoaders(mode), svgLoader(mode), scssLoader(mode), fontLoader(mode)];

	if (isProd) {
		loaders.push(babelLoader());
	}

	return loaders;
};

function pugLoader() {
	return {
		test: /\.pug$/,
		loader: 'pug-loader',
	};
}

function imageLoader(mode) {
	const object = {
		test: /\.(png|jpe?g|svg|gif|webp)$/i,
		exclude: /sprites/,
		type: 'asset/resource',
		generator: {
			filename: `assets/img/${getFileTemplateName(mode)}[ext]`,
		},
	};

	if (mode === 'production') {
		object.use = [
			{
				loader: 'image-webpack-loader',
				options: {
					mozjpeg: {
						progressive: true,
					},
					// optipng.enabled: false will disable optipng
					optipng: {
						enabled: false,
					},
					pngquant: {
						quality: [0.65, 0.9],
						speed: 4,
					},
					gifsicle: {
						interlaced: false,
					},
					// the webp option will enable WEBP
					webp: {
						quality: 75,
					},
				},
			},
		];
	}

	return object;
}

function mediaLoaders(mode) {
	return {
		test: /\.mp(4|3)$/,
		type: 'asset/resource',
		generator: {
			filename: `assets/media/${getFileTemplateName(mode)}[ext]`,
		},
	};
}

function svgLoader(mode) {
	return {
		test: /\.svg$/i,
		type: 'asset/resource',
		generator: {
			filename: `assets/${getFileTemplateName(mode)}[ext]`,
		},
	};
}

function scssLoader(mode) {
	if (mode === 'development') {
		return {
			test: /\.(c|sa|sc)ss$/i,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
		};
	} else {
		return {
			test: /\.(c|sa|sc)ss$/i,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [['postcss-preset-env']],
						},
					},
				},
				'sass-loader',
			],
		};
	}
}

function fontLoader(mode) {
	return {
		test: /\.(woff2?|eot|ttf|otf)$/i,
		type: 'asset/resource',
		generator: {
			filename: `assets/fonts/${getFileTemplateName(mode)}[ext]`,
		},
	};
}

function babelLoader() {
	return {
		test: /\.(?:js|mjs|cjs)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [['@babel/preset-env', { targets: 'defaults' }]],
			},
		},
	};
}
