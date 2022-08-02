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

export function rakingAuthorsScrap(
	html: string
): PensadorScrapingTypes.IRankingAuthorsProps[] {
	const $ = load(html);

	const data = $("#topautores > ul > li >")
		.slice(0, 9)
		.map((i, e): PensadorScrapingTypes.IRankingAuthorsProps => {
			return {
				avatar_url: $(e).find("img").attr("src") || "",
				href: $(e).attr("href") || "",
				name: $(e).attr("title") || "",
				position: i++,
			};
		})
		.toArray();

	return data;
}
