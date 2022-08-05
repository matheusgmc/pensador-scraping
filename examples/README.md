# Exemplos

é importante lembrar que a importação da biblioteca sera diferente em seu projeto.

```js
import pensador from "pensador-scrap";
// ou
const pensador = require("pensador-scrap");
```

### Sumário

- `search` - Utilizado caso queira procurar um termo específico

  - paramêtros: `{query:string, limit:number}`
  - `query` - o termo que deseja procurar, ex: elon musk, frases bonitas...
  - `limit` - é a quantidade de pensamentos que deseja receber, o padrão é 1.

- `random` - Caso queira um pensamento aleatório sobre algum tópico especifico ou não.

  - paramêtros: informe um tópico que deseja, ex: frases bonitas, bom dia...

- `bio-author` - Utilizado para obter a biografia de um autor, recebe o conteúdo da pagina dividos por tópicos.

  - paramêtros: `{query:string}`
  - `query` - o termo que deseja procurar, ex: elon musk

- `about-author` - Diferente do `bio-author` que retorna a biografia completa, no about ira retorna um breve resumo do autor.

- `ranking-author` - Ira buscar na home do site os 9 autores mais populares.

- `get-associated` - Ao buscar um determinado termo, ira obter uma lista de temas associados ao termo, ex: você busca por "frases", os termos associados podem ser "Melhores frases", "Reflexão" ou "Otimismo".
