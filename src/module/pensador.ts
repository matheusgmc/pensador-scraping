import { AxiosInstance } from "axios";
import { IResponsePensador, PensadorFetch } from "pescador-scraping-types";
import Utils from "../utils/";

export class Pensador implements PensadorFetch {
	constructor(private router: AxiosInstance) {}

	async searchWord(q: string): Promise<IResponsePensador> {
		try {
			if (!q || Utils.checkString(q)) {
				throw new Error("essa query não é válido.");
			}
			const { data } = await this.router.get("/" + q.replace(" ", "_"));
			return { html: data };
		} catch (error: any) {
			return { err: error.message };
		}
	}

	async getAuthor(author: string): Promise<IResponsePensador> {
		try {
			if (!author || Utils.checkString(author)) {
				throw new Error("essa query não é válido.");
			}
			const { data } = await this.router(
				"/autor/" + author.toLowerCase().replace(" ", "_")
			);
			return { html: data };
		} catch (error: any) {
			return { err: error.message };
		}
	}

	async getHome(): Promise<IResponsePensador> {
		try {
			const { data } = await this.router("/");
			return { html: data };
		} catch (error: any) {
			return { err: error.message };
		}
	}

	async getBio(author: string): Promise<IResponsePensador> {
		try {
			if (!author || Utils.checkString(author)) {
				throw new Error("essa query não é válido.");
			}
			const { data } = await this.router(
				`/autor/${author.toLowerCase().replace(" ", "_")}/biografia`
			);
			return { html: data };
		} catch (error: any) {
			return { err: error.message };
		}
	}
}
