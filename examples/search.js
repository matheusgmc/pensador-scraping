const pensador = require("../dist/");
(async () => {
	const { error, success } = await pensador.search({
		query: "elon musk",
		limit: 2,
	});
	if (error) {
		return console.log("ocorreu um erro:", error);
	}
	console.log(success);
})();

/**
 * 
 * o resultado vira assim:
  {
  author: {
    name: 'Elon Musk',
    thought_total: 60,
    avatar_url: '',
    info: 'Elon Reeve Musk (1971-) é um empreendedor, filantropo e visionário sul-africano, canadense e americano. Faz parte da lista dos homens mais ricos do mundo e é CEO da Tesla e da SpaceX.\n' +
      'Sobre Elon Musk\n' +
      'Elon Reeve Musk (1971-) é um empreendedor, filantropo e visionário sul-africano, canadense e americano. Faz parte da lista dos homens mais ricos do mundo e é CEO da Tesla e da SpaceX.',
    associated: [ 'https://www.pensador.com/frases_de_elon_musk/' ],
    bio: '',
    tags: ''
  },
  thought: [
    {
      author: 'Elon Musk',
      content: 'Quando algo é importante o suficiente, você realiza, mesmo que as chances não estejam a seu favor.',
      image_url: 'https://cdn.pensador.com/img/frase/el/on/elon_musk_quando_algo_e_importante_o_suficiente_voce_re_lev51zy.jpg',
      url: 'https://www.pensador.com/frase/MjYwNzU3NA/'
    },
    {
      author: 'Elon Musk',
      content: 'A persistência é muito importante. Você não deve desistir, a menos que seja forçado a desistir.',
      image_url: 'https://cdn.pensador.com/img/frase/el/on/elon_musk_a_persistencia_e_muito_importante_voce_nao_de_l5o39j3.jpg',
      url: 'https://www.pensador.com/frase/MjYwNzU3Mg/'
    }
  ],
  query: 'elon musk',
  total: 2
}
*/
