import { CheerioAPI } from "cheerio";
import { formatUrl } from "./format-url";

export const scrapAssociated = ($: CheerioAPI): string[] => {
	return $("div.row > .sidebar > .list-boxed > .list-item > a")
		.map((i, e) => formatUrl($(e).attr("href")))
		.toArray();
};
