import { Author } from "../entities/author";
import { Thought } from "../entities/thought";

export interface IPensador {
	query: string;
	limit?: number;
}

export interface IResponseSearch {
	total: number;
	query: string;
	thought: Thought[];
	author: Author;
}

export interface IResponse<T> {
	sucess?: T;
	error?: string;
}
