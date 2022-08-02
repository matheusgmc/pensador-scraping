import { load } from "cheerio";
import type { PensadorScrapingTypes } from "../../types/";
import { scrapAssociated, scrapContent, scrapName } from "../../utils";

export function bioAuthorsScrap(
	html: string
): PensadorScrapingTypes.IBioAuthorProps {
	const $ = load(html);
	const title = scrapName($);
	const content = scrapContent($);
	const associated = scrapAssociated($);
	return {
		associated,
		content,
		name: content[0].paragraph,
		title,
	};
}
