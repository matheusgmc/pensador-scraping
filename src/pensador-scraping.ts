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
	getHref,
} from "./modules/pensador/";

import { randomNumber } from "./utils";

import type { PensadorScrapingTypes } from "./types/";

/**
 *
 * @param {{query,limit}} data
 * @param {string} data.query - o termo que queira buscar (obrigatório)
 * @param {number} data.limit - a quantidade que deseja (padrão=1)
 * @description Caso queira buscar uma lista de pensamento usando algum termo específico
 * @example
 *
 *const {err,success} = await search({query:"elon musk"})
 *	//err - em caso de erro
 *	//success - em caso de sucesso ira retorna o pensamento
 * const {author, thought, query,total } = success
 */
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
		success: {
			author,
			thought,
			query,
			total,
		},
	};
}

/**
 *
 * @param {{query}} data
 * @param {string} data.query - o termo que queira buscar (obrigatório)
 * @description Diferente do `bio-author` que retorna a biografia completa, aqui ira retorna um breve resumo do autor.
 * @example
 *
 *const {err,success} = await aboutAuthor({query:"elon musk"})
 *	//err - em caso de erro
 *	//success - em caso de sucesso
 * const {name, thought_total,avatar_url, info,associated,bio,tags} = success
 */
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
		success: result,
	};
}

/**
 *
 * @param {{query}} data
 * @param {string} data.query - o termo que queira buscar (obrigatório)
 * @description Utilizado para obter a biografia de um autor, recebe o conteúdo da pagina dividos por tópicos.
 * @example
 *
 *const {err,success} = await bioAuthor({query:"o rappa"})
 *	//err - em caso de erro
 *	//success - em caso de sucesso
 * const {associated, content,name, info,associated,title} = success
 */
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
		success: result,
	};
}
/**
 * @description Ira buscar na home do site os 9 autores mais populares.
 * @example
 *
 *const {err,success} = await rankingAuthor()
 *	//err - em caso de erro
 *	//success - em caso de sucesso
 * const {avatar_url,href,name,position} = success[0] //retorna um array
 */
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
		success: result,
	};
}
/**
 * @param {{query}} data
 * @param {String} data.query - o termo que queira buscar (obrigatório)
 * @description Ao buscar um determinado termo, ira obter uma lista de temas associados ao termo.
 * @example
 *
 *const {err,success} = await rankingAuthor()
 *	//err - em caso de erro
 *	//success - em caso de sucesso
 * const {href,name,category} = success[0] //retorna um array
 */
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
		success: result,
	};
}

/**
 * @param {String} topic o tópico que queira buscar (obrigatório)
 * @description Caso queira um pensamento aleatório sobre algum tópico especifico ou não.
 * @example
 *
 *const {err,success} = await randomThought()
 *	//err - em caso de erro
 *	//success - em caso de sucesso
 * const {author, content, image_url, url} = success
 */
export async function randomThought(
	topic?: string
): Promise<
	PensadorScrapingTypes.IResponse<PensadorScrapingTypes.IThoughtProps>
> {
	const { err, html } = await searchWord(topic ? topic : "frases");
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
		const thoughts = await getHref(topicSearch.href);

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
		success: listThoughts[randomNumber(listThoughts.length)],
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
