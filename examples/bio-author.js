const pensador = require("../dist");

(async () => {
	const { error, sucess } = await pensador.bioAuthor({
		query: "o rappa",
	});

	if (error) {
		return console.log("ocorreu algum erro:", error);
	}

	console.log(sucess);
})();
/**
{
  associated: [
    'https://www.pensador.com/frases_de_falcao_e_o_rappa/',
    'https://www.pensador.com/frases_de_falcao_do_rappa/',
    'https://www.pensador.com/frases_do_rappa/'
  ],
  content: [
    { paragraphs: [Array], topic: 'O Rappa' },
    { paragraphs: [Array], topic: 'Discografia' }
  ],
  name: 'O Rappa',
  title: 'Biografia de O Rappa'
} 
*/
