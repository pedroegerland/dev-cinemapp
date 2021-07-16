Desafio Backend

Nosso passatempo favorito nessa quarentena tem sido assistir filmes e seriados, por isso pensamos em desenvolver uma solução que nos ajude na hora de selecionar o que mais gostamos. Caso você aceite o nosso desafio, precisamos que você implemente um sistema onde será possível buscar por filmes e séries utilizando a API (http://www.omdbapi.com/). Com todos esses filmes a nossa disposição queremos basicamente separar nossos favoritos, para que possamos encontrá-los facilmente depois. Portanto a sua solução deve:

* Permitir a busca por filmes que gostamos
* Listar os filmes encontrados
* Permitir que escolhamos nosso filmes favoritos
* Permitir que removamos um filme de nossos favoritos (às vezes um filme enjoa)
* Listar nossos filmes favoritos

Para facilitar um pouco mais as coisas, já deixamos separada uma chave de acesso para a API (ou você pode criar a sua também):

Chave de API: 925eba28
Exemplo requisição: GET http://www.omdbapi.com/?apikey=925eba28&s=batman

Comportamento esperado da aplicação:

1) Ao buscar um filme, a aplicação deve buscar a informação em um banco de dados em memória (cash);
2) Caso encontrar, os dados devem ser retornados. Caso não, a consulta deve ser realizada no banco de dados da aplicação (relacional ou não);
3) Caso encontrar, os dados devem ser retornados. Caso não, deve ser feita a integração com a API dos filmes, salvando os dados no banco de dados da aplicação e em memória, e retornando os dados.

Observações:
* Pode ser utilizado qualquer banco de dados;
* Stack de preferência: Node.js;
* Não é necessária a implementação do frontend;
* Será um diferencial se a aplicação estiver hospedada em algum provedor;
* É importante que haja uma descrição de como realizar o teste da solução.

Entrega da sua solução
Deixe bem claro suas premissas, suposições e como executamos seu código. Para entregar essa solução, de um “fork” neste repositório e nos mande o link do novo repositório quando finalizar a tarefa.
O prazo para a entrega da solução é de 72h a partir de seu início.