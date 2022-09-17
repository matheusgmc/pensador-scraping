const pensador = require("../dist");

(async () => {
	const { error, success } = await pensador.randomThought();
	if (error) {
		return console.log("ocorreu algum erro:", error);
	}

	console.log(success);
})();
/**
{
  author: 'Machado de Assis',
  content: 'Deus, para a felicidade do homem, inventou a fé e o amor. O Diabo, invejoso, fez o homem confundir fé com religião e amor com casamento.',
  image_url: 'https://cdn.pensador.com/img/frase/ma/ch/machado_de_assis_deus_para_a_felicidade_do_homem_invent_l6k7vdk.jpg',
  url: 'https://www.pensador.com/frase/NDQy/'
}
 */
