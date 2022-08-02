import router from "../../services/fetch";

import type { PensadorScrapingTypes } from "../../types";

export async function getHome(): Promise<PensadorScrapingTypes.IResponsePensador> {
	try {
		const { data } = await router.get("/");
		return { html: data };
	} catch (error: any) {
		return { err: error.message };
	}
}
