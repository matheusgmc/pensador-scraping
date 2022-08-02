import { AxiosInstance } from "axios";
import { CheerioAPI } from "cheerio";
export declare namespace PensadorScrapingTypes {
	export interface IAuthorProps {
		name: string;
		avatar_url: string;
		info: string;
		thought_total: number;
		associated: string[];
		tags?: string;
		bio?: string;
	}

	export interface IBioAuthorProps {
		title: string;
		name: string;
		associated: string[];
		content: IContentProps[];
	}

	export interface ITopicProps {
		category: string;
		href: string;
		name: string;
		thought?: IThoughtProps;
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

	export interface IThoughtProps {
		author: string;
		content: string;
		url: string;
		image_url?: string;
	}

	export interface IPensador {
		query: string;
		limit?: number;
	}
	export interface IResponse<T> {
		sucess?: T;
		error?: string;
	}

	export interface IResponseSearch extends IResponseScrapSearch {
		query: string;
		author: IAuthorProps;
	}

	export interface IResponseScrapSearch {
		total: number;
		thought: IThoughtProps[];
	}

	export interface IResponsePensador {
		html?: string;
		err?: string;
	}

	export class PensadorFetch {
		constructor(router: AxiosInstance);

		searchWord(q: string): Promise<IResponsePensador>;
		getAuthor(author: string): Promise<IResponsePensador>;

		getHome(): Promise<IResponsePensador>;

		getBio(author: string): Promise<IResponsePensador>;
	}

	export class Scraping {
		constructor();
		searchScrap(html: string, limit: number): IResponseScrapSearch;

		authorScrap(html: string): IAuthorProps;

		rakingAuthorsScrap(html: string): IRankingAuthorsProps[];

		bioAuthorsScrap(html: string): IBioAuthorProps;
	}

	export class PensadorScraping {
		constructor();
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
