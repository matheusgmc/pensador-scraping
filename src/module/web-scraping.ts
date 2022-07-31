import { Cheerio, CheerioAPI, Element, load } from "cheerio";
import {
	IResponseWebScrapingAuthor,
	IResponseWebScrapingBioAuthor,
	IResponseWebScrapingRakingAuthors,
	IResponseWebScrapingThought,
} from "../@types/web-scraping";
import { configDefault } from "../config/config_default";
import { Content } from "../entities/content";
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
		const name = this.scrapName($);
		const tags = this.scrapTags($);

		const thought_total = this.splitThoughtTotalNumber($);

		const info = this.scrapInfo($);
		const bio = this.scrapHrefBio($);
		const associated = this.scrapAssociated($);
		return {
			name,
			thought_total: thought_total ? Number(thought_total) : 0,
			avatar_url: "",
			info,
			associated,
			bio,
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

	bioAuthorsScrap(html: string): IResponseWebScrapingBioAuthor {
		const $ = load(html);
		const title = this.scrapName($);
		const content = this.scrapContent($);
		const associated = this.scrapAssociated($);
		return {
			associated,
			content,
			name: content[0].paragraph,
			title,
		};
	}

	private scrapName($: CheerioAPI): string {
		return $("div.row > #content > .top").find(".title").text().trim();
	}

	private scrapTags($: CheerioAPI): string {
		return $("div.row > #content > .top").find(".tagline").text().trim();
	}

	private scrapAssociated($: CheerioAPI): string[] {
		return $("div.row > .sidebar > .list-boxed > .list-item > a")
			.map((i, e) => this.formatUrl($(e).attr("href")))
			.toArray();
	}

	private scrapHrefBio($: CheerioAPI): string {
		const href = $("div.row")
			.find(".resumo > .clearfix > a")
			.first()
			.attr("href");
		return href ? this.formatUrl(href) : "";
	}

	private scrapContent($: CheerioAPI): Content[] {
		const data: Content[] = [];
		$("div.row > #content > #texto")
			.children()
			.each((i, e) => {
				const item = $(e).text().trim();
				if (data.length == 0 || e.name == "h2") {
					data.push({
						content: [],
						paragraph: item,
					});
					return;
				}

				data[data.length - 1].content.push(item);
			});
		return data;
	}

	private scrapInfo($: CheerioAPI): string {
		return $("div.row").find(".resumo").text().trim();
	}

	private scrapThought($: CheerioAPI): string {
		return $("div.row > #content")
			.find(".description")
			.last()
			.text()
			.trim()
			.replace("\n", "");
	}

	private splitThoughtTotalNumber($: CheerioAPI): number {
		const number = this.scrapThought($)
			.replace(/[a-z]+|\:|-\\n|[!@#\\$%\\^\\&*\\)\\(+=._-]/gim, "")
			.replace(/\s+/gim, " ")
			.split(" ")
			.filter(e => e)
			.pop();
		return Number(number);
	}

	private formatUrl(href?: string) {
		if (!href) return "";
		return `${configDefault.base_url}${href}`;
	}
}
