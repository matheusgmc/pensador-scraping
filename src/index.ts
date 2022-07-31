import { Scraping } from "./module/web-scraping";
import { Pensador } from "./module/pensador";
import FetchPensador from "./services/fetch";
import { IPensador, IResponse, IResponseSearch } from "./@types";
import {
	IResponseWebScrapingAuthor,
	IResponseWebScrapingRakingAuthors,
} from "./@types/web-scraping";
class PensadorScraping {
	private scraping = new Scraping();
	private pensador = new Pensador(FetchPensador);
	constructor() {}

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
	}: Omit<IPensador, "limit">): Promise<IResponse<IResponseWebScrapingAuthor>> {
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

	async rankingAuthors(): Promise<
		IResponse<IResponseWebScrapingRakingAuthors[]>
	> {
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

export default PensadorScraping;
