module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'standard',
		'eslint-config-prettier',
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'simple-import-sort'],
	rules: {
		'spaced-comment': 'off',
		'react/prop-types': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
	},
};
