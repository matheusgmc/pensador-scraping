import { Author } from "../entities/author";
import { BioAuthor } from "../entities/bio-author";
import { RankAuthor } from "../entities/rank-author";
import { Thought } from "../entities/thought";

export interface IResponseWebScrapingThought {
	total: number;
	thought: Thought[];
}

export interface IResponseWebScrapingAuthor extends Author {}

export interface IResponseWebScrapingRakingAuthors extends RankAuthor {}
export interface IResponseWebScrapingBioAuthor extends BioAuthor {}
