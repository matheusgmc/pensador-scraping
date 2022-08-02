import type { CheerioAPI } from "cheerio";

export const scrapThought = ($: CheerioAPI): string => {
	return $("div.row > #content")
		.find(".description")
		.last()
		.text()
		.trim()
		.replace("\n", "");
};
