import { load } from "cheerio";
import type { PensadorScrapingTypes } from "../../types/";
import {
	scrapAssociated,
	scrapAvatar_Url,
	scrapHrefBio,
	scrapInfo,
	scrapName,
	scrapTags,
	splitThoughtTotalNumber,
} from "../../utils";

export function topicsScrap(html: string): PensadorScrapingTypes.ITopicProps[] {
	const $ = load(html);
	var categoryP = "";
	const result: PensadorScrapingTypes.ITopicProps[] = [];
	$("#content > ul > li")
		.each((i, e) => {
			const category = $(e).find(".title-bg").text().trim();
			categoryP = category != "" ? category : categoryP;

			if (category != "") return;

			result.push({
				href: $(e).find(".list-item > a").first().attr("href") || "",
				name: $(e).find(".list-item > a").first().text().trim(),
				category: categoryP,
			});
		})
		.toArray();
	return result;
}
