import router from "../../services/fetch";
import { checkString } from "../../utils/";

import type { PensadorScrapingTypes } from "../../types/";

export async function search(
	q: string
): Promise<PensadorScrapingTypes.IResponsePensador> {
	try {
		if (!q || checkString(q)) {
			throw new Error("essa query não é válido.");
		}
		const { data } = await router.get("/" + q.replace(" ", "_"));
		return { html: data };
	} catch (error: any) {
		return { err: error.message };
	}
}
