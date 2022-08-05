const pensador = require("../dist");

(async () => {
	const { error, sucess } = await pensador.getAssociated({
		query: "frases",
	});

	if (error) {
		return console.log("ocorreu algum erro:", error);
	}

	console.log(sucess);
})();
/**
[
  {
    href: '/frases_curtas/',
    name: 'Frases Curtas',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_de_amor/',
    name: 'Frases de Amor',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_de_reflexao/',
    name: 'Frases de Reflexão',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_lindas/',
    name: 'Frases Lindas',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_inteligentes/',
    name: 'Frases Inteligentes',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_de_amizade/',
    name: 'Frases de Amizade',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_romanticas/',
    name: 'Frases Românticas',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_de_otimismo/',
    name: 'Frases de Otimismo',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_bonitas/',
    name: 'Frases Bonitas',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_sobre_felicidade/',
    name: 'Frases sobre Felicidade',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_de_motivacao/',
    name: 'Frases de Motivação',
    category: 'Melhores Frases'
  },
  {
    href: '/frases_de_vida/',
    name: 'Frases de Vida',
    category: 'Melhores Frases'
  }
]
 */
