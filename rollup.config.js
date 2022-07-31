// rollup.config.js (building more than one bundle)
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: pkg.main,
				format: "cjs",
				exports: "auto",
			},
			{
				file: pkg.module,
				format: "es",
				exports: "auto",
			},
		],
		external: ["axios", "cheerio"],
		plugins: [
			typescript({
				tsconfig: "./tsconfig.json",
			}),
		],
	},
];
