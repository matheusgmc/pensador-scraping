import type { CheerioAPI } from "cheerio";

export const scrapInfo = ($: CheerioAPI): string => {
	return $("div.row").find(".resumo").text().trim();
};
