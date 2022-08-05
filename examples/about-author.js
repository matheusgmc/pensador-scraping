const pensador = require("../dist");

(async () => {
	const { error, sucess } = await pensador.aboutAuthor({
		query: "elon musk",
	});

	if (error) {
		return console.log("ocorreu algum erro:", error);
	}

	console.log(sucess);
})();
/**
{
  name: 'Elon Musk',
  thought_total: 26,
  avatar_url: '',
  info: 'Sobre Elon Musk\n' +
    'Elon Reeve Musk (1971-) é um empreendedor, filantropo e visionário sul-africano, canadense e americano. Faz parte da lista dos homens mais ricos do mundo e é CEO da Tesla e da SpaceX.',
  associated: [ 'https://www.pensador.com/frases_de_elon_musk/' ],
  bio: '',
  tags: ''
}
*/
