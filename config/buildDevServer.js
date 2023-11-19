module.exports = function buildDevServer(options) {
	return {
		static: './dist',
		port: options.port ?? 3000,
		open: true,
		hot: true,
	};
}
