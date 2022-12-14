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
export function authorScrap(html: string): PensadorScrapingTypes.IAuthorProps {
	const $ = load(html);
	const name = scrapName($);
	const tags = scrapTags($);

	const thought_total = splitThoughtTotalNumber($);

	const info = scrapInfo($);
	const bio = scrapHrefBio($);
	const associated = scrapAssociated($);

	const avatar_url = scrapAvatar_Url($);

	return {
		name,
		thought_total: thought_total ? Number(thought_total) : 0,
		avatar_url,
		info,
		associated,
		bio,
		tags,
	};
}
