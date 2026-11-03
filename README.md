# Biblioteca Online — API REST

API REST para gerenciamento de **livros**, **autores** e **editoras**, desenvolvida com Node.js, Express e MongoDB (Mongoose).

## Funcionalidades

- CRUD completo de livros, autores e editoras
- Relacionamento entre coleções: cada livro referencia um autor e uma editora (`populate`)
- Paginação e ordenação em todas as listagens
- Busca de livros por título, faixa de páginas, nome do autor e nome da editora
- Validações no schema: campos obrigatórios, bloqueio de strings em branco, faixa de páginas e ano de fundação — aplicadas também nas atualizações
- Tratamento de erros centralizado, com respostas padronizadas para 400, 404 e 500

## Tecnologias

- [Node.js](https://nodejs.org/) (ES Modules)
- [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose 9](https://mongoosejs.com/)
- ESLint e Prettier

## Estrutura

```
├── server.js                  # Ponto de entrada: carrega o .env e sobe o servidor
└── src/
    ├── app.js                 # Configuração do Express, conexão com o banco e middlewares
    ├── config/
    │   └── dbConnect.js       # Conexão com o MongoDB
    ├── controllers/           # Regras de cada recurso (livros, autores, editoras)
    ├── erros/                 # Classes de erro (ErroBase e derivadas)
    ├── middlewares/
    │   ├── manipulador404.js  # Rotas inexistentes
    │   ├── manipuladorDeErros.js  # Converte erros em respostas HTTP
    │   └── paginar.js         # Paginação e ordenação
    ├── models/                # Schemas do Mongoose e validador global
    └── routes/                # Definição das rotas
```

## Como executar

**Pré-requisitos:** Node.js 20.19+ e uma instância do MongoDB (local ou [Atlas](https://www.mongodb.com/atlas)).

```bash
git clone https://github.com/Gondaline/biblioteca-online.git
cd biblioteca-online
npm install
```

Crie um arquivo `.env` na raiz a partir do exemplo:

```bash
cp .env.example .env
```

```env
DB_CONNECTION_STRING=mongodb+srv://usuario:senha@cluster0.exemplo.mongodb.net/biblioteca
PORT=3000
```

Inicie o servidor:

```bash
npm run dev   # desenvolvimento, com reload automático (nodemon)
npm start     # produção
npm run lint  # análise estática com ESLint
```

A API fica disponível em `http://localhost:3000`.

## Endpoints

### Livros

| Método | Rota            | Descrição                              |
| ------ | --------------- | -------------------------------------- |
| GET    | `/livros`       | Lista livros (paginado)                |
| GET    | `/livros/busca` | Busca livros por filtros (paginado)    |
| GET    | `/livros/:id`   | Detalha um livro                       |
| POST   | `/livros`       | Cadastra um livro                      |
| PUT    | `/livros/:id`   | Atualiza um livro                      |
| DELETE | `/livros/:id`   | Remove um livro                        |

```json
{
  "titulo": "O Senhor dos Anéis",
  "autor": "<id do autor>",
  "editora": "<id da editora>",
  "paginas": 1200,
  "preco": 89.9
}
```

### Autores

| Método | Rota           | Descrição                |
| ------ | -------------- | ------------------------ |
| GET    | `/autores`     | Lista autores (paginado) |
| GET    | `/autores/:id` | Detalha um autor         |
| POST   | `/autores`     | Cadastra um autor        |
| PUT    | `/autores/:id` | Atualiza um autor        |
| DELETE | `/autores/:id` | Remove um autor          |

```json
{
  "nome": "J. R. R. Tolkien",
  "nacionalidade": "Britânica"
}
```

### Editoras

| Método | Rota            | Descrição                 |
| ------ | --------------- | ------------------------- |
| GET    | `/editoras`     | Lista editoras (paginado) |
| GET    | `/editoras/:id` | Detalha uma editora       |
| POST   | `/editoras`     | Cadastra uma editora      |
| PUT    | `/editoras/:id` | Atualiza uma editora      |
| DELETE | `/editoras/:id` | Remove uma editora        |

```json
{
  "nome": "HarperCollins",
  "pais": "Estados Unidos",
  "anoFundacao": 1989
}
```

## Paginação e ordenação

Todas as listagens aceitam os parâmetros abaixo:

| Parâmetro   | Padrão   | Descrição                                                  |
| ----------- | -------- | ---------------------------------------------------------- |
| `limite`    | `5`      | Quantidade de itens por página                             |
| `pagina`    | `1`      | Página desejada                                            |
| `ordenacao` | `_id:-1` | `campo:ordem`, com `1` (crescente) ou `-1` (decrescente)   |

```
GET /livros?limite=10&pagina=2&ordenacao=titulo:1
```

## Busca de livros

`GET /livros/busca` aceita qualquer combinação dos filtros:

| Parâmetro     | Descrição                                             |
| ------------- | ----------------------------------------------------- |
| `titulo`      | Parte do título (sem diferenciar maiúsculas)          |
| `minPaginas`  | Número mínimo de páginas                              |
| `maxPaginas`  | Número máximo de páginas                              |
| `nomeAutor`   | Nome exato do autor                                   |
| `nomeEditora` | Nome exato da editora                                 |

```
GET /livros/busca?titulo=senhor&minPaginas=300&nomeEditora=HarperCollins
```

## Respostas de erro

Todos os erros seguem o mesmo formato:

```json
{
  "mensagem": "Os seguintes erros foram encontrados: O título do livro é obrigatório",
  "status": 400
}
```

| Status | Quando ocorre                                               |
| ------ | ----------------------------------------------------------- |
| 400    | ID em formato inválido ou dados que não passam na validação |
| 404    | Recurso ou rota não encontrados                             |
| 500    | Erro interno do servidor                                    |

## Autor

**Vinícius Gondaline Silva** — [GitHub](https://github.com/Gondaline)
