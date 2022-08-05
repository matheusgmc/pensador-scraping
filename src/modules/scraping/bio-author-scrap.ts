import { load } from "cheerio";
import type { PensadorScrapingTypes } from "../../types/";
import { scrapAssociated, scrapParagraphs, scrapName } from "../../utils";

export function bioAuthorsScrap(
	html: string
): PensadorScrapingTypes.IBioAuthorProps {
	const $ = load(html);
	const title = scrapName($);
	const content = scrapParagraphs($);
	const associated = scrapAssociated($);
	return {
		associated,
		content,
		name: content[0].topic,
		title,
	};
}
