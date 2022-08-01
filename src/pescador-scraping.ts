import { ScrapingInstance } from "./module/web-scraping";
import { Pensador } from "./module/pensador";
import fetch from "./services/fetch";

export class PensadorScrapingInstance implements PensadorScraping.events {
	private pensador = new Pensador(fetch);
	private scraping = new ScrapingInstance();

	/**
	 *
	 * @param {PensadorScraping.IPensador}
	 * @returns {Promise<PensadorScraping.IResponse<PensadorScraping.IResponseSearch>>}
	 */
	async search({
		limit = 1,
		query,
	}: PensadorScraping.IPensador): Promise<
		PensadorScraping.IResponse<PensadorScraping.IResponseSearch>
	> {
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
	}: Omit<PensadorScraping.IPensador, "limit">): Promise<
		PensadorScraping.IResponse<PensadorScraping.IAuthorProps>
	> {
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
	}: Omit<PensadorScraping.IPensador, "limit">): Promise<
		PensadorScraping.IResponse<PensadorScraping.IBioAuthorProps>
	> {
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

	async rankingAuthors(): Promise<
		PensadorScraping.IResponse<PensadorScraping.IRankingAuthorsProps[]>
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

declare namespace PensadorScraping {
	/* protected scraping: Scraping;
	protected pensador: Pensador; */
	export interface IAuthorProps {
		name: string;
		avatar_url: string;
		info: string;
		thought_total: number;
		associated: string[];
		tags?: string;
		bio?: string;
	}
	export interface IPensador {
		query: string;
		limit?: number;
	}
	export interface IResponseSearch extends IResponseScrapSearch {
		query: string;
		author: IAuthorProps;
	}
	export interface IResponseScrapSearch {
		total: number;
		thought: IThoughtProps[];
	}
	export interface IThoughtProps {
		author: string;
		content: string;
		url: string;
		image_url?: string;
	}

	export interface IResponse<T> {
		sucess?: T;
		error?: string;
	}

	export interface IBioAuthorProps {
		title: string;
		name: string;
		associated: string[];
		content: IContentProps[];
	}
	export interface IContentProps {
		paragraph: string;
		content: string[];
	}

	export interface IRankingAuthorsProps {
		name: string;
		avatar_url: string;
		href: string;
		position: number;
	}
	export interface events {
		search(data: IPensador): Promise<IResponse<IResponseSearch>>;

		aboutAuthor(
			data: Omit<IPensador, "limit">
		): Promise<IResponse<IAuthorProps>>;

		bioAuthor(
			data: Omit<IPensador, "limit">
		): Promise<IResponse<IBioAuthorProps>>;

		rankingAuthors(): Promise<IResponse<IRankingAuthorsProps[]>>;
	}
}
