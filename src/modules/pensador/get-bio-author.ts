import router from "../../services/fetch";
import { checkString } from "../../utils";

import type { PensadorScrapingTypes } from "../../types";

export async function getBio(
	author: string
): Promise<PensadorScrapingTypes.IResponsePensador> {
	try {
		if (!author || checkString(author)) {
			throw new Error("essa query não é válido.");
		}
		const { data } = await router.get(
			`/autor/${author.toLowerCase().replace(" ", "_")}/biografia`
		);
		return { html: data };
	} catch (error: any) {
		return { err: error.message };
	}
}
