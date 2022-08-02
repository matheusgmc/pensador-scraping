import type { CheerioAPI } from "cheerio";
import { scrapThought } from "./thought";
export const splitThoughtTotalNumber = ($: CheerioAPI): number => {
	const number = scrapThought($)
		.replace(/[a-z]+|\:|-\\n|[!@#\\$%\\^\\&*\\)\\(+=._-]/gim, "")
		.replace(/\s+/gim, " ")
		.split(" ")
		.filter(e => e)
		.pop();
	return Number(number);
};
