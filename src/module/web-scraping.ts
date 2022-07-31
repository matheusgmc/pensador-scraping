import { load } from "cheerio";
import {
	IResponseWebScrapingAuthor,
	IResponseWebScrapingRakingAuthors,
	IResponseWebScrapingThought,
} from "../@types/web-scraping";
import { configDefault } from "../config/config_default";
import { Thought } from "../entities/thought";

export class Scraping {
	constructor() {}

	searchScrap(html: string, limit: number): IResponseWebScrapingThought {
		const $ = load(html);
		const data = $("div.thought-card.mb-20")
			.slice(0, limit)
			.map((i, e): Thought => {
				return {
					author: $(e).find(".autor").text().trim(),
					content: $(e).find(".frase").text().trim(),
					image_url: $(e).attr("data-src"),
					url: this.formatUrl(
						$(e)
							.find(
								".iconbar > .icon-bar--user-wrapper > .icon-user--btn.more > a"
							)
							.attr("href")
					),
				};
			})
			.toArray();
		return {
			author: data.length >= 1 ? data[0].author : "",
			thought: data,
			total: data.length,
		};
	}

	authorScrap(html: string): IResponseWebScrapingAuthor {
		const $ = load(html);
		const content = $("div.row").find("#content");
		const name = content.find(".title").text().trim();
		const thought_total = content
			.find(".description > strong")
			.last()
			.text()
			.trim();
		const info = $("div.row").find(".resumo").text().trim();
		const associated = $("div.row > .sidebar > .list-boxed > .list-item > a")
			.map((i, e) => this.formatUrl($(e).attr("href")))
			.toArray();
		return {
			name,
			thought_total: Number(thought_total) || 0,
			info,
			associated,
		};
	}

	rakingAuthorsScrap(html: string): IResponseWebScrapingRakingAuthors[] {
		const $ = load(html);

		const data = $("#topautores > ul > li >")
			.slice(0, 9)
			.map((i, e): IResponseWebScrapingRakingAuthors => {
				return {
					avatar_url: $(e).find("img").attr("src") || "",
					href: $(e).attr("href") || "",
					name: $(e).attr("title") || "",
					position: i++,
				};
			})
			.toArray();

		return data;
	}

	private formatUrl(href?: string) {
		if (!href) return "";
		return `${configDefault.base_url}${href}`;
	}
}
