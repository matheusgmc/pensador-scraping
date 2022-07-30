import { AxiosInstance } from "axios";
import { IResponsePensador } from "../@types/pensador";

export class Pensador {
	constructor(private router: AxiosInstance) {}

	async search(q: string): Promise<IResponsePensador> {
		try {
			const { data } = await this.router.get(
				"/busca.php?q=" + q.replace(" ", "+")
			);
			return { html: data };
		} catch (error: any) {
			return { err: error.message };
		}
	}

	async getAuthor(author: string): Promise<IResponsePensador> {
		try {
			const { data } = await this.router(
				"/autor/" + author.toLowerCase().replace(" ", "_")
			);
			return { html: data };
		} catch (error: any) {
			return { err: error.message };
		}
	}

	async getTopAuthors(): Promise<IResponsePensador> {
		try {
			const { data } = await this.router("/");
			return { html: data };
		} catch (error: any) {
			return { err: error.message };
		}
	}
}
