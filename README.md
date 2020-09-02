<h1 align="center">
    🚀 Database Upload
</h1>
<p align="center">Desafio do GoStack 13 upload de arquivos e banco de dados</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-12.13.1-green"/>
  <!--<img src="https://img.shields.io/badge/repo%20size-2.00%20MB-informational" />-->
  <img src="https://img.shields.io/badge/score-10.00-important" />
  <img src="https://img.shields.io/badge/last%20commit-august-blue" />
  <img src="https://img.shields.io/badge/license-MIT-success"/>
</p>

<p align="center">
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-pré-requisitos">Pré-Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rodando-o-back-end-servidor">Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-bibliotecas">Bibliotecas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Lincença</a>
</p>

<h3 align="center"> 
🚧  Finalizado  🚧
</h3>

### 📌 Desafio e Conhecimento
Neste desafio, colocamos em prática os conhecimentos adquiridos durante a semana.
Com isso, utilizamos de alguns princípios da arquitetura SOLID para montar o backend.
Para trabalhar com o banco de dados, utilizamos o conceito de container estabelecido pelo 
Docker e ORM (Object Relational Mapping) para manusear informações do banco.
<br>
Já para fazer upload de arquivo e a leitura de arquivos CSV, utilizamos um middleware de 
upload de arquivos chamado multer e a lib csv-parse, respectivamente.

### 📎 Features

- [x] Listar Transações com o balanço das mesmas
- [x] Cadastro de Transações
- [x] Deleção de Transações
- [x] Importar arquivo CSV e cadastrar as informações das transações no banco de dados

### ⚙ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e/ou [Yarn](https://https://yarnpkg.com/)
Também, será necessário ter o [Docker](https://www.docker.com/) instalado e configurado em sua máquina, com um container rodando.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/Gabriel-Teixeira/GGoStack-Fundamentos-Nodejs

# Instale as dependências
$ npm install ou yarn

# Execute a aplicação em modo de desenvolvimento
$ yarn dev ou npm run dev

# Execute os testes
$ yarn test

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

* Obs: Para executar os testes, crie antes um banco de dados chamado gostack_desafio06_test.

### 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Node.js
- Express
- TypeScript
- Jest
- Docker
- Postgres

### 📕 Bibliotecas

Esse projeto foi escrito com o auxílio das seguintes libs:

- TypeORM
- ts-node-dev
- uuidv4
- Prettier
- Multer
- csv-parse
- Eslint

### 📝 Licença

Esse projeto está sob a licença MIT.

<hr/>

Feito por Gabriel Teixeira
