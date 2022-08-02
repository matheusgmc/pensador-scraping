import { CheerioAPI } from "cheerio";
import { formatUrl } from "./format-url";

export const scrapHrefBio = ($: CheerioAPI): string => {
	const href = $("div.row")
		.find(".resumo > .clearfix > a")
		.first()
		.attr("href");
	return href ? formatUrl(href) : "";
};
