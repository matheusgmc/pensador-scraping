import type { CheerioAPI } from "cheerio";

export const scrapName = ($: CheerioAPI): string => {
	return $("div.row > #content > .top").find(".title").text().trim();
};
