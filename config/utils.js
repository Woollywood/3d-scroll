module.exports = function getFileTemplateName(mode) {
	return mode === 'production' ? '[name].[contenthash]' : '[name]';
};
