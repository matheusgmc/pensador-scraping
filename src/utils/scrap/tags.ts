import type { CheerioAPI } from "cheerio";

export const scrapTags = ($: CheerioAPI): string => {
	return $("div.row > #content > .top").find(".tagline").text().trim();
};
