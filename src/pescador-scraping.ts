import {
	authorScrap,
	bioAuthorsScrap,
	rakingAuthorsScrap,
	searchScrap,
	topicsScrap,
} from "./modules/scraping";
import {
	search as searchWord,
	getAuthor,
	getBio,
	getHome,
} from "./modules/pensador/";

import { randomNumber, scrapThought } from "./utils";

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
		return { error: "html vazio" };
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
		return { error: "html vazio" };
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
		return { error: err };
	}
	if (!html) {
		return { error: "html vazio" };
	}
	const result = rakingAuthorsScrap(html);
	return {
		sucess: result,
	};
}

export async function getAssociated({
	query,
}: PensadorScrapingTypes.IPensador): Promise<
	PensadorScrapingTypes.IResponse<PensadorScrapingTypes.ITopicProps[]>
> {
	const { err, html } = await searchWord(query);
	if (err) {
		return { error: err };
	}

	if (!html) {
		return { error: "html vazio" };
	}
	const result = topicsScrap(html);

	if (result.length == 0) {
		return { error: "Não foi encontrado nenhum resultado" };
	}

	return {
		sucess: result,
	};
}

export async function randomThought(
	topic?: string
): Promise<
	PensadorScrapingTypes.IResponse<PensadorScrapingTypes.IThoughtProps>
> {
	const topics = ["frases", "frases_bonitas", "poemas", "mensagens", "textos"];
	const { err, html } = await searchWord(
		topic ? topic : topics[randomNumber(topics.length)]
	);
	const error = ErrorPensador({ err, html });
	if (error) {
		return { error };
	}
	const result = topicsScrap(html as string);
	var listThoughts: PensadorScrapingTypes.IThoughtProps[] = [];
	if (result.length == 0) {
		const { thought, total } = searchScrap(html as string, 99);
		if (total == 0) {
			return { error: "não encontrei nenhum resultado" };
		}
		listThoughts = thought;
	} else {
		const topicSearch = result[randomNumber(result.length)];

		const thoughts = await searchWord(topicSearch.name);

		const errorThoughts = ErrorPensador(thoughts);
		if (errorThoughts) {
			return { error: errorThoughts };
		}

		const { thought, total } = searchScrap(thoughts.html as string, 99);
		if (total == 0) {
			return { error: "não encontrei nenhum resultado" };
		}
		listThoughts = thought;
	}
	return {
		sucess: listThoughts[randomNumber(listThoughts.length)],
	};
}

function ErrorPensador(
	data: PensadorScrapingTypes.IResponsePensador
): string | undefined {
	if (data.err) {
		return data.err;
	}
	if (!data.html) {
		return "html vazio";
	}
}
