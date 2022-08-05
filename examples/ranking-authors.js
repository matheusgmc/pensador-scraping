const pensador = require("../dist/");

(async () => {
	const { error, sucess } = await pensador.rankingAuthors();

	if (error) {
		return console.log(error);
	}

	console.log(sucess);
})();

/**
[
  {
    avatar_url: 'https://cdn.pensador.com/img/authors-thumbs/platao.jpg',
    href: '/autor/platao/',
    name: 'Platão',
    position: 0
  },
  {
    avatar_url: 'https://cdn.pensador.com/img/authors-thumbs/lispector.jpg',
    href: '/autor/clarice_lispector/',
    name: 'Clarice Lispector',
    position: 1
  },
  {
    avatar_url: 'https://cdn.pensador.com/img/authors-thumbs/nietzsche.jpg',
    href: '/autor/friedrich_nietzsche/',
    name: 'Friedrich Nietzsche',
    position: 2
  },
  {
    avatar_url: 'https://cdn.pensador.com/img/authors-thumbs/haile.jpg',
    href: '/autor/haile_selassie/',
    name: 'Haile Selassie',
    position: 3
  },
  {
    avatar_url: 'https://cdn.pensador.com/img/authors-thumbs/quintana.jpg',
    href: '/autor/mario_quintana/',
    name: 'Mario Quintana',
    position: 4
  },
  {
    avatar_url: 'https://cdn.pensador.com/img/authors-thumbs/machadoassis.jpg',
    href: '/autor/machado_de_assis/',
    name: 'Machado de Assis',
    position: 5
  },
  {
    avatar_url: 'https://cdn.pensador.com/img/authors-thumbs/oscarwilde.jpg',
    href: '/autor/oscar_wilde/',
    name: 'Oscar Wilde',
    position: 6
  },
  {
    avatar_url: 'https://cdn.pensador.com/img/authors-thumbs/fernandopessoa.jpg',
    href: '/autor/fernando_pessoa/',
    name: 'Fernando Pessoa',
    position: 7
  },
  {
    avatar_url: 'https://cdn.pensador.com/img/authors-thumbs/shakespeare.jpg',
    href: '/autor/william_shakespeare/',
    name: 'William Shakespeare',
    position: 8
  }
]
 */
