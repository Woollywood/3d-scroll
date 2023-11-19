module.exports = function buildResolvers({ mode, paths }) {
	const srcPath = paths.srcPath;

	return {
		alias: {
			'@': srcPath,
			'@assets': `${srcPath}/assets/`,
			'@styles': `${srcPath}/assets/styles/`,
			'@img': `${srcPath}/assets/img/`,
			'@sprites': `${srcPath}/assets/sprites/`,
			'@fonts': `${srcPath}/assets/fonts/`,
		},
	};
};
