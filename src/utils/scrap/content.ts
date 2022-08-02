import { CheerioAPI } from "cheerio";
import { PescadorScrapingTypes } from "../../types/";

export const scrapContent = (
	$: CheerioAPI
): PescadorScrapingTypes.IContentProps[] => {
	const data: PescadorScrapingTypes.IContentProps[] = [];
	$("div.row > #content > #texto")
		.children()
		.each((i, e) => {
			const item = $(e).text().trim();
			if (data.length == 0 || e.name == "h2") {
				data.push({
					content: [],
					paragraph: item,
				});
				return;
			}

			data[data.length - 1].content.push(item);
		});
	return data;
};
