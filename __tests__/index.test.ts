import PensadorScraping from "../src/";
jest.setTimeout(10000); // 10 second timeout
describe("Pensador - Scraping", () => {
	const props = {
		query: "elon musk",
	};

	const propsWord = {
		query: "frases",
	};

	const propsFail = {
		query: "null",
	};

	const suit = PensadorScraping;

	describe("Search", () => {
		it("deveria retorna uma item com sucesso porem limitado a 1 resultado de pensamento.", async () => {
			const { sucess } = await suit.search(props);
			expect(sucess?.query.toLowerCase()).toBe("elon musk");
			expect(sucess?.total).toBe(1);
			expect(sucess?.thought[0]).toHaveProperty("author", "Elon Musk");
			expect(sucess?.thought[0]).not.toHaveProperty("content", "");
			expect(sucess?.thought[0]).not.toHaveProperty("url", "");
			expect(sucess?.author.associated.length).toBeGreaterThanOrEqual(1);
			expect(sucess?.author.info).not.toBe("");
			expect(sucess?.author.name.toLowerCase()).toBe("elon musk");
			expect(sucess?.author.thought_total).toBeGreaterThanOrEqual(26);
		});

		it("deveria retorna uma item com sucesso porem limitado a 5 resultado de pensamento.", async () => {
			const { sucess } = await suit.search({
				...props,
				limit: 5,
			});
			expect(sucess?.query.toLowerCase()).toBe("elon musk");
			expect(sucess?.total).toBe(5);
			expect(sucess?.thought[0]).toHaveProperty("author", "Elon Musk");
			expect(sucess?.thought[0]).not.toHaveProperty("content", "");
			expect(sucess?.thought[0]).not.toHaveProperty("url", "");
			expect(sucess?.author.associated.length).toBeGreaterThanOrEqual(1);
			expect(sucess?.author.info).not.toBe("");
			expect(sucess?.author.name.toLowerCase()).toBe("elon musk");
			expect(sucess?.author.thought_total).toBeGreaterThanOrEqual(26);
		});

		it("deveria falhar por ser um item inválido.", async () => {
			const { error } = await suit.search(propsFail);
			expect(error).toBe("essa query não é válido.");
		});
	});
	describe("About Author", () => {
		it("deveria obter as informações do autor com sucesso.", async () => {
			const { sucess } = await suit.aboutAuthor({
				query: "William Shakespeare",
			});
			expect(sucess?.name.toLowerCase()).toBe("william shakespeare");

			expect(sucess?.associated.length).toBeGreaterThanOrEqual(1);
			expect(sucess?.thought_total).toBeGreaterThanOrEqual(26);

			expect(sucess?.bio).not.toBeUndefined();
			expect(sucess?.tags).not.toBeUndefined();

			expect(sucess?.avatar_url).not.toBe("");

			expect(sucess?.info).not.toBe("");
			expect(sucess?.bio).not.toBe("");
			expect(sucess?.tags).not.toBe("");
		});
		it("deveria falhar ao não encontra um autor.", async () => {
			const { error } = await suit.aboutAuthor(propsWord);
			expect(error).toContain("não é um autor.");
		});
		it("deveria falhar se a query é inválida.", async () => {
			const { error } = await suit.aboutAuthor(propsFail);
			expect(error).toBe("essa query não é válido.");
		});
	});

	describe("Biography Author", () => {
		it("deveria obter as informações do autor com sucesso.", async () => {
			const { sucess } = await suit.bioAuthor({
				query: "William Shakespeare",
			});
			expect(sucess?.name.toLowerCase()).toBe("william shakespeare");
			expect(sucess?.title.toLowerCase()).toBe(
				"biografia de william shakespeare"
			);
			expect(sucess?.content.length).toBeGreaterThanOrEqual(1);
			expect(sucess?.associated.length).toBeGreaterThanOrEqual(1);
		});
		it("deveria falhar se a query é inválida.", async () => {
			const { error } = await suit.bioAuthor(propsFail);
			expect(error).toBe("essa query não é válido.");
		});
	});

	describe("Ranking Authors", () => {
		it("deveria obter com sucesso as lista dos top 9 do site", async () => {
			const { sucess } = await suit.rankingAuthors();
			expect(sucess).toHaveLength(9);
			sucess?.forEach((item, i) => {
				expect(item).not.toHaveProperty("avatar_url", "");
				expect(item).not.toHaveProperty("name", "");
				expect(item).not.toHaveProperty("href", "");
				expect(item).toHaveProperty("position", i++);
			});
		});
	});
});
