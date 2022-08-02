import { CheerioAPI } from "cheerio";

export const scrapAvatar_Url = ($: CheerioAPI): string => {
	return $("div.row > #content > .top").find("img").first().attr("src") || "";
};
