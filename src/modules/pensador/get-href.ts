import router from "../../services/fetch";

import type { PensadorScrapingTypes } from "../../types";

export async function getHref(
	href: string
): Promise<PensadorScrapingTypes.IResponsePensador> {
	try {
		const { data } = await router.get(href);
		return { html: data };
	} catch (error: any) {
		return { err: error.message };
	}
}
