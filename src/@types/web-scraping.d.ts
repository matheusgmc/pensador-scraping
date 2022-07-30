import { Author } from "../entities/author";
import { RankAuthor } from "../entities/rank-author";
import { Thought } from "../entities/thought";

export interface IResponseWebScrapingThought {
	total: number;
	author: string;
	thought: Thought[];
}

export interface IResponseWebScrapingAuthor extends Author {}

export interface IResponseWebScrapingRakingAuthors extends RankAuthor {}
