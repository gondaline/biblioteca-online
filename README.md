# Biblioteca Online — API REST

API REST para gerenciamento de **livros**, **autores** e **editoras**, desenvolvida com Node.js, Express e MongoDB (Mongoose).

> **Deploy na AWS:** esta API foi publicada em uma instância Amazon EC2, com Nginx como proxy reverso, systemd e MongoDB Atlas. O passo a passo, as decisões de segurança e as evidências estão em [docs/deploy-aws.md](docs/deploy-aws.md).

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
├── server.js                   # Ponto de entrada: carrega o .env e sobe o servidor
├── docs/
│   ├── deploy-aws.md           # Deploy na AWS: passo a passo, segurança e evidências
│   └── images/                 # Capturas do deploy
└── src/
    ├── app.js                  # Configuração do Express, conexão com o banco e middlewares
    ├── config/
    │   └── dbConnect.js        # Conexão com o MongoDB
    ├── controllers/            # Regras de cada recurso (books, authors, publishers)
    ├── errors/                 # Classes de erro (BaseError e derivadas)
    ├── middlewares/
    │   ├── errorHandler.js     # Converte erros em respostas HTTP
    │   ├── notFoundHandler.js  # Rotas inexistentes
    │   └── paginate.js         # Paginação e ordenação
    ├── models/                 # Schemas do Mongoose e validador global
    └── routes/                 # Definição das rotas
```

## Como executar

**Pré-requisitos:** Node.js 20.19+ e uma instância do MongoDB (local ou [Atlas](https://www.mongodb.com/atlas)).

```bash
git clone https://github.com/gondaline/biblioteca-online.git
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

| Método | Rota            | Descrição                           |
| ------ | --------------- | ----------------------------------- |
| GET    | `/books`        | Lista livros (paginado)             |
| GET    | `/books/search` | Busca livros por filtros (paginado) |
| GET    | `/books/:id`    | Detalha um livro                    |
| POST   | `/books`        | Cadastra um livro                   |
| PUT    | `/books/:id`    | Atualiza um livro                   |
| DELETE | `/books/:id`    | Remove um livro                     |

```json
{
  "title": "O Senhor dos Anéis",
  "author": "<id do autor>",
  "publisher": "<id da editora>",
  "pages": 1200,
  "price": 89.9
}
```

### Autores

| Método | Rota           | Descrição                |
| ------ | -------------- | ------------------------ |
| GET    | `/authors`     | Lista autores (paginado) |
| GET    | `/authors/:id` | Detalha um autor         |
| POST   | `/authors`     | Cadastra um autor        |
| PUT    | `/authors/:id` | Atualiza um autor        |
| DELETE | `/authors/:id` | Remove um autor          |

```json
{
  "name": "J. R. R. Tolkien",
  "nationality": "Britânica"
}
```

### Editoras

| Método | Rota              | Descrição                 |
| ------ | ----------------- | ------------------------- |
| GET    | `/publishers`     | Lista editoras (paginado) |
| GET    | `/publishers/:id` | Detalha uma editora       |
| POST   | `/publishers`     | Cadastra uma editora      |
| PUT    | `/publishers/:id` | Atualiza uma editora      |
| DELETE | `/publishers/:id` | Remove uma editora        |

```json
{
  "name": "HarperCollins",
  "country": "Estados Unidos",
  "foundedYear": 1989
}
```

## Paginação e ordenação

Todas as listagens aceitam os parâmetros abaixo:

| Parâmetro | Padrão   | Descrição                                                |
| --------- | -------- | -------------------------------------------------------- |
| `limit`   | `5`      | Quantidade de itens por página                           |
| `page`    | `1`      | Página desejada                                          |
| `sort`    | `_id:-1` | `campo:ordem`, com `1` (crescente) ou `-1` (decrescente) |

```
GET /books?limit=10&page=2&sort=title:1
```

## Busca de livros

`GET /books/search` aceita qualquer combinação dos filtros:

| Parâmetro       | Descrição                                    |
| --------------- | -------------------------------------------- |
| `title`         | Parte do título (sem diferenciar maiúsculas) |
| `minPages`      | Número mínimo de páginas                     |
| `maxPages`      | Número máximo de páginas                     |
| `authorName`    | Nome exato do autor                          |
| `publisherName` | Nome exato da editora                        |

```
GET /books/search?title=senhor&minPages=300&publisherName=HarperCollins
```

## Respostas de erro

Todos os erros seguem o mesmo formato:

```json
{
  "message": "Os seguintes erros foram encontrados: O título do livro é obrigatório",
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
