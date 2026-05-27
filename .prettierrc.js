/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	plugins: ["prettier-plugin-solidity"],
	experimentalTernaries: false,
	experimentalOperatorPosition: "end",
	printWidth: 100,
	semi: false,
	singleQuote: false,
	quoteProps: "as-needed",
	jsxSingleQuote: false,
	trailingComma: "none",
	bracketSpacing: true,
	objectWrap: "preserve",
	bracketSameLine: false,
	arrowParens: "always",
	rangeStart: 0,
	rangeEnd: Infinity,
	// parser: null,
	// filepath: undefined,
	requirePragma: false,
	insertPragma: false,
	proseWrap: "preserve",
	htmlWhitespaceSensitivity: "css",
	vueIndentScriptAndStyle: false,
	embeddedLanguageFormatting: "auto",
	singleAttributePerLine: false,
	overrides: [
		{
			files: "*.sol",
			options: {
				parser: "slang"
			}
		}
	]
}

export default config
