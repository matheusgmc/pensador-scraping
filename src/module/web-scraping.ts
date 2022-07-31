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
			thought: data,
			total: data.length,
		};
	}

	authorScrap(html: string): IResponseWebScrapingAuthor {
		const $ = load(html);
		const content = $("div.row").find("#content");
		const resumo = $("div.row").find(".resumo");
		const top = content.find(".top");
		const name = top.find(".title").text().trim();
		const tags = top.find(".tagline").text().trim();

		const thought_total_text = content
			.find(".description")
			.last()
			.text()
			.trim()
			.replace("\n", "");

		const thought_total = thought_total_text
			.replace(/[a-z]+|\:|-\\n|[!@#\\$%\\^\\&*\\)\\(+=._-]/gim, "")
			.replace(/\s+/gim, " ")
			.split(" ")
			.filter(e => e)
			.pop();

		const info = resumo.text().trim();
		const href = resumo.find("a").attr("href");

		const associated = $("div.row > .sidebar > .list-boxed > .list-item > a")
			.map((i, e) => this.formatUrl($(e).attr("href")))
			.toArray();
		return {
			name,
			thought_total: thought_total ? Number(thought_total) : 0,
			info,
			associated,
			bio: this.formatUrl(href),
			tags,
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
