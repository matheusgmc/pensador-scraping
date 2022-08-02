import { load } from "cheerio";
import type { PensadorScrapingTypes } from "../../types/";
import { formatUrl } from "../../utils";
export function searchScrap(
	html: string,
	limit: number
): PensadorScrapingTypes.IResponseScrapSearch {
	const $ = load(html);
	const data = $("div.thought-card.mb-20")
		.slice(0, limit)
		.map((i, e): PensadorScrapingTypes.IThoughtProps => {
			return {
				author: $(e).find(".autor").text().trim(),
				content: $(e).find(".frase").text().trim(),
				image_url: $(e).attr("data-src"),
				url: formatUrl(
					$(e)
						.find(
							".iconbar > .icon-bar--user-wrapper > .icon-user--btn.more > a"
						)
						.attr("href")
				),
			};
		})
		.toArray();
	return {
		thought: data,
		total: data.length,
	};
}
