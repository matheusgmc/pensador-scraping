import {
	authorScrap,
	bioAuthorsScrap,
	rakingAuthorsScrap,
	searchScrap,
} from "./modules/scraping";
import {
	search as searchWord,
	getAuthor,
	getBio,
	getHome,
} from "./modules/pensador/";

import type { PensadorScrapingTypes } from "./types/";

export async function search({
	limit = 1,
	query,
}: PensadorScrapingTypes.IPensador): Promise<
	PensadorScrapingTypes.IResponse<PensadorScrapingTypes.IResponseSearch>
> {
	const { err, html } = await searchWord(query);
	if (err) {
		return { error: err };
	}
	if (!html) {
		return { error: "html vázio" };
	}

	const { thought, total } = searchScrap(html, limit);
	const author = authorScrap(html);
	return {
		sucess: {
			author,
			thought,
			query,
			total,
		},
	};
}
export async function aboutAuthor({
	query,
}: Omit<PensadorScrapingTypes.IPensador, "limit">): Promise<
	PensadorScrapingTypes.IResponse<PensadorScrapingTypes.IAuthorProps>
> {
	const { err, html } = await getAuthor(query);
	if (err) {
		return { error: err };
	}
	if (!html) {
		throw new Error("html vazio");
	}

	const result = authorScrap(html);
	if (!result.info) {
		return { error: `${query} não é um autor.` };
	}

	return {
		sucess: result,
	};
}

export async function bioAuthor({
	query,
}: Omit<PensadorScrapingTypes.IPensador, "limit">): Promise<
	PensadorScrapingTypes.IResponse<PensadorScrapingTypes.IBioAuthorProps>
> {
	const { err, html } = await getBio(query);
	if (err) {
		return { error: err };
	}
	if (!html) {
		throw new Error("html vazio");
	}

	const result = bioAuthorsScrap(html);
	return {
		sucess: result,
	};
}

export async function rankingAuthors(): Promise<
	PensadorScrapingTypes.IResponse<PensadorScrapingTypes.IRankingAuthorsProps[]>
> {
	const { err, html } = await getHome();
	if (err) {
		throw new Error(err);
	}
	if (!html) {
		throw new Error("html vazio");
	}
	const result = rakingAuthorsScrap(html);
	return {
		sucess: result,
	};
}
