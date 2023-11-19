const path = require('path');
const fs = require('fs');

const buildWebpack = require('./config/buildWebpack');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const pagesDir = `${srcPath}/pug/pages`;
const pages = fs.readdirSync(pagesDir).filter((filename) => filename.endsWith('.pug'));

module.exports = (env) => {
	const paths = {
		srcPath,
		entry: `${srcPath}/js/index.js`,
		output: distPath,
		html: pagesDir,
	};

	const config = buildWebpack({
		port: process.env.port ?? 3000,
		mode: process.env.NODE_ENV ?? 'development',
		paths,
		pages,
	});

	return config;
};
