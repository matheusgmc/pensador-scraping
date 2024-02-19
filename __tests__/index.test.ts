import * as PensadorScraping from "../src/";

declare global {
	namespace jest {
		interface Matchers<R> {
			toBeContentOrImage(): R;
		}
	}
}

expect.extend({
	toBeContentOrImage(received) {
		if (!received.content) {
			if (!received.image_url) {
				return {
					message: () => `expected image_url is empty`,
					pass: false,
				};
			}
			return {
				message: () => "expected image_url is not empty",
				pass: true,
			};
		}
		return {
			message: () => "expected content is not empty",
			pass: true,
		};
	},
});

jest.setTimeout(15000); // 15 second timeout
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
			const { success } = await suit.search(props);
			expect(success?.query.toLowerCase()).toBe("elon musk");
			expect(success?.total).toBe(1);
			expect(success?.thought[0]).toHaveProperty("author", "Elon Musk");
			expect(success?.thought[0]).not.toHaveProperty("content", "");
			expect(success?.thought[0]).not.toHaveProperty("url", "");
			expect(success?.author.associated.length).toBeGreaterThanOrEqual(1);
			expect(success?.author.name.toLowerCase()).toBe("elon musk");
		});

		it("deveria retorna uma item com sucesso porem limitado a 5 resultado de pensamento.", async () => {
			const { success } = await suit.search({
				...props,
				limit: 5,
			});
			expect(success?.query.toLowerCase()).toBe("elon musk");
			expect(success?.total).toBe(5);
			expect(success?.thought[0]).toHaveProperty("author", "Elon Musk");
			expect(success?.thought[0]).not.toHaveProperty("content", "");
			expect(success?.thought[0]).not.toHaveProperty("url", "");
			expect(success?.author.associated.length).toBeGreaterThanOrEqual(1);
			expect(success?.author.name.toLowerCase()).toBe("elon musk");
		});

		it("deveria falhar por ser um item inválido.", async () => {
			const { error } = await suit.search(propsFail);
			expect(error).toBe("essa query não é válido. - query: null");
		});
	});
	describe("About Author", () => {
		it("deveria obter as informações do autor com sucesso.", async () => {
			const { success } = await suit.aboutAuthor({
				query: "William Shakespeare",
			});
			expect(success?.name.toLowerCase()).toBe("william shakespeare");

			expect(success?.associated.length).toBeGreaterThanOrEqual(1);
			expect(success?.thought_total).toBeGreaterThanOrEqual(26);

			expect(success?.bio).not.toBeUndefined();
			expect(success?.tags).not.toBeUndefined();

			expect(success?.avatar_url).not.toBe("");

			expect(success?.info).not.toBe("");
			expect(success?.bio).not.toBe("");
			expect(success?.tags).not.toBe("");
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
			const { success } = await suit.bioAuthor({
				query: "William Shakespeare",
			});
			expect(success?.name.toLowerCase()).toBe("william shakespeare");
			expect(success?.title.toLowerCase()).toBe(
				"biografia de william shakespeare"
			);
			expect(success?.content.length).toBeGreaterThanOrEqual(1);
			expect(success?.associated.length).toBeGreaterThanOrEqual(1);
		});
		it("deveria falhar se a query é inválida.", async () => {
			const { error } = await suit.bioAuthor(propsFail);
			expect(error).toBe("essa query não é válido.");
		});
	});

	describe("Ranking Authors", () => {
		it("deveria obter com sucesso as lista dos top 9 do site", async () => {
			const { success } = await suit.rankingAuthors();
			expect(success).toHaveLength(9);
			success?.forEach((item, i) => {
				expect(item).not.toHaveProperty("avatar_url", "");
				expect(item).not.toHaveProperty("name", "");
				expect(item).not.toHaveProperty("href", "");
				expect(item).toHaveProperty("position", i++);
			});
		});
	});

	describe("Get Associated", () => {
		it("deveria obter com sucesso a lista associada com o item", async () => {
			const { success } = await suit.getAssociated({
				query: "frases",
			});
			expect(success?.length).toBeGreaterThanOrEqual(1);
			success?.forEach(item => {
				expect(item).not.toHaveProperty("category", "");
				expect(item).not.toHaveProperty("href", "");
				expect(item).not.toHaveProperty("name", "");
			});
		});
		it("deveria obter com sucesso a lista associada com o item", async () => {
			const { error } = await suit.getAssociated({
				query: "elon musk",
			});
			expect(error).toBe("Não foi encontrado nenhum resultado");
		});

		it("deveria falhar na ausência de um paramêtro", async () => {
			const { error } = await suit.getAssociated({
				query: "",
			});
			expect(error).toBe("essa query não é válido. - query: ");
		});
	});
	describe("Get Random", () => {
		it("deveria obter um thought de algum tópico aleatório", async () => {
			const { success } = await suit.randomThought();
			expect(success).toBeContentOrImage();
			expect(success).not.toHaveProperty("url", "");
			expect(success).not.toHaveProperty("author", "");
		});
		it("deveria obter um thought com sucesso", async () => {
			const { success } = await suit.randomThought("elon musk");
			expect(success).toBeContentOrImage();
			expect(success).not.toHaveProperty("url", "");
			expect(success).not.toHaveProperty("author", "");
		});
	});
});
