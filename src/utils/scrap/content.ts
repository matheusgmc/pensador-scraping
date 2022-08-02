import { CheerioAPI } from "cheerio";
import { PensadorScrapingTypes } from "../../types/";

export const scrapContent = (
	$: CheerioAPI
): PensadorScrapingTypes.IContentProps[] => {
	const data: PensadorScrapingTypes.IContentProps[] = [];
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
