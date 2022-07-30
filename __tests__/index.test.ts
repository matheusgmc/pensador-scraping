import PensadorScraping from "../src/";
jest.setTimeout(10000); // 10 second timeout
describe("Pensador - Scraping", () => {
	const props = {
		query: "elon musk",
	};

	const propsFail = {
		query: "null",
	};

	const suit = new PensadorScraping();

	describe("Search", () => {
		it("deveria retorna uma item com sucesso porem limitado a 1 resultado de pensamento.", async () => {
			const { author, thought, total } = await suit.search(props);
			expect(author.toLowerCase()).toBe("elon musk");
			expect(total).toBe(1);
			expect(thought[0]).toHaveProperty("author", "Elon Musk");
			expect(thought[0]).not.toHaveProperty("content", "");
			expect(thought[0]).not.toHaveProperty("url", "");
		});

		it("deveria retorna um item com sucesso porem com nenhum resultado de pensamento.", async () => {
			const { author, thought, total } = await suit.search(propsFail);
			expect(author.toLowerCase()).toBe("");
			expect(total).toBe(0);
			expect(thought).toHaveLength(0);
		});
	});

	describe("About Author", () => {
		it("deveria obter as informações do autor com sucesso.", async () => {
			const { associated, info, name, thought_total } = await suit.aboutAuthor(
				props
			);

			expect(associated.length).toBeGreaterThanOrEqual(1);
			expect(info).not.toBe("");
			expect(name.toLowerCase()).toBe("elon musk");
			expect(thought_total).toBeGreaterThanOrEqual(26);
		});
		it("deveria obter nenhuma informações do autor.", async () => {
			const { associated, info, name, thought_total } = await suit.aboutAuthor(
				propsFail
			);

			expect(associated.length).toBeGreaterThanOrEqual(0);
			expect(info).toBe("");
			expect(name.toLowerCase()).toBe("null");
			expect(thought_total).toBe(0);
		});
	});

	describe("Ranking Authors", () => {
		it("deveria obeter com sucesso as lista dos top 9 do site", async () => {
			const data = await suit.rankingAuthors();
			expect(data).toHaveLength(9);
			data.forEach((item, i) => {
				expect(item).not.toHaveProperty("avatar_url", "");
				expect(item).not.toHaveProperty("name", "");
				expect(item).not.toHaveProperty("href", "");
				expect(item).toHaveProperty("position", i++);
			});
		});
	});
});
