import { Scraping } from "./module/web-scraping";
import { Pensador } from "./module/pensador";
import FetchPensador from "./services/fetch";
import { IPensador } from "./@types";
import {
	IResponseWebScrapingAuthor,
	IResponseWebScrapingRakingAuthors,
	IResponseWebScrapingThought,
} from "./@types/web-scraping";
class PensadorScraping {
	private scraping = new Scraping();
	private pensador = new Pensador(FetchPensador);
	constructor() {}

	async search({
		limit = 1,
		query,
	}: IPensador): Promise<IResponseWebScrapingThought> {
		const { err, html } = await this.pensador.search(query);
		if (err) {
			throw new Error(err);
		}
		if (!html) {
			throw new Error("html vazio");
		}

		const result = this.scraping.searchScrap(html, limit);
		return result;
	}

	async aboutAuthor({
		query,
	}: Omit<IPensador, "limit">): Promise<IResponseWebScrapingAuthor> {
		const { err, html } = await this.pensador.getAuthor(query);
		if (err) {
			throw new Error(err);
		}
		if (!html) {
			throw new Error("html vazio");
		}
		const result = this.scraping.authorScrap(html);
		return result;
	}

	async rankingAuthors(): Promise<IResponseWebScrapingRakingAuthors[]> {
		const { err, html } = await this.pensador.getHome();
		if (err) {
			throw new Error(err);
		}
		if (!html) {
			throw new Error("html vazio");
		}
		const result = this.scraping.rakingAuthorsScrap(html);
		return result;
	}
}

export default PensadorScraping;
