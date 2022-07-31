import { ScrapingInstance } from "./module/web-scraping";
import { Pensador } from "./module/pensador";
import fetch from "./services/fetch";
import type {
	PensadorScraping,
	IResponse,
	IResponseSearch,
	IPensador,
	IAuthorProps,
	IBioAuthorProps,
	IRankingAuthorsProps,
	Scraping,
} from "pescador-scraping-types";

export class PensadorScrapingInstance implements PensadorScraping {
	private pensador = new Pensador(fetch);
	private scraping = new ScrapingInstance();

	/**
	 *
	 * @param {IPensador}
	 * @returns {Promise<IResponse<IResponseSearch>>}
	 */
	async search({
		limit = 1,
		query,
	}: IPensador): Promise<IResponse<IResponseSearch>> {
		const { err, html } = await this.pensador.searchWord(query);
		if (err) {
			return { error: err };
		}
		if (!html) {
			return { error: "html vázio" };
		}

		const { thought, total } = this.scraping.searchScrap(html, limit);
		const author = this.scraping.authorScrap(html);
		return {
			sucess: {
				author,
				thought,
				query,
				total,
			},
		};
	}

	async aboutAuthor({
		query,
	}: Omit<IPensador, "limit">): Promise<IResponse<IAuthorProps>> {
		const { err, html } = await this.pensador.getAuthor(query);
		if (err) {
			return { error: err };
		}
		if (!html) {
			throw new Error("html vazio");
		}

		const result = this.scraping.authorScrap(html);
		if (!result.info) {
			return { error: `${query} não é um autor.` };
		}

		return {
			sucess: result,
		};
	}

	async bioAuthor({
		query,
	}: Omit<IPensador, "limit">): Promise<IResponse<IBioAuthorProps>> {
		const { err, html } = await this.pensador.getBio(query);
		if (err) {
			return { error: err };
		}
		if (!html) {
			throw new Error("html vazio");
		}

		const result = this.scraping.bioAuthorsScrap(html);
		return {
			sucess: result,
		};
	}

	async rankingAuthors(): Promise<IResponse<IRankingAuthorsProps[]>> {
		const { err, html } = await this.pensador.getHome();
		if (err) {
			throw new Error(err);
		}
		if (!html) {
			throw new Error("html vazio");
		}
		const result = this.scraping.rakingAuthorsScrap(html);
		return {
			sucess: result,
		};
	}
}
