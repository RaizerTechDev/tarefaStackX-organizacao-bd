# Tarefa - Organização Banco de Dados - Airbnb

## Índice

- [Objetivo](#-objetivo)
- [Documentação](#-documentação-do-projeto)
- [Instalação](#instalação-com-bash)
- [Gerenciamento de Tabelas - Operações de Listar e Deletar](#gerenciamento-de-tabelas---operações-de-listar-e-deletar)
- [Demonstração Código Resumido](#demonstração-código-resumido)
  - [- `models/User.js`](#--modelsuserjs)
  - [- `database.js`](#--databasejs)
  - [- `index.js`](#--indexjs)

## 🌟 Objetivo:

### 📍 Você foi convocado para um time que desenvolverá o novo Airbnb

Descreva como você organizaria um banco de dados que precisa , no inicio, de:

⏭️Usuários;
⏭️Lugares para se hospedar - cadastrados pelos usuários;
⏭️ Hospedagens (um período de tempo no qual usuário Y vai ficar no lugar X) - realizadas também por usuários;
⏭️ Avaliações feitas pelos usuários nas hospedagens.

📍 A descrição deve conter:

⏭️ Nomes de tabelas que você faria;
⏭️ Colunas que você acha mais importantes nas tabelas;
⏭️ Relacionamentos delas e como ficaria nas colunas das tabelas;
⏭️ Uma explicação mínima de o que te levou por essas decisões.

<br>

---

## 📖 Documentação do Projeto

 <div align="center">

<img src ="././public/assets/images/doc.png" alt="Descrição da Imagem" height="45">

[✨ **Clique aqui para saber mais da documentação** ✨](https://github.com/RaizerTechDev/tarefaStackX-organizacao-bd/blob/master/Documentation.md)

<br>

<div align="center">
  
<img src= "https://media.giphy.com/media/3zSF3Gnr7cxMbi6WoP/giphy.gif" align="center" height="55" width="55"> [Demonstração-Tabelas] <img src= "https://media.giphy.com/media/E5DzZsofmgxc9wjbhX/giphy.gif" align="center" height="35" width="35">

<img height="480em" src="././public/assets/images/readme-tabelas-bd.png"  align="center">

<br>

---

<div align="left">

## Instalação com bash

- Clone o repositório:

```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

- Navegue até o diretório do projeto:

```
cd nome-do-repositorio
```

- Instale as dependências:

```
npm install dotenv mongoose
```

- Instalando pacotes para formatação

```
npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier prettier
```

<br>

- Inicie o servidor:

```
npm start
```

<br>

- Vai iniciar no terminal a consulta das Tabelas.

---

## Gerenciamento de Tabelas - Operações de Listar e Deletar

Nesta parte do projeto serve para fornecer ferramentas simples para listar e deletar tabelas. Abaixo estão as instruções detalhadas para realizar essas operações.

### Como usar

#### 1. Listar Tabelas:

Para listar todas as tabelas disponíveis no sistema, execute o seguinte comando:

```bash
node src/services/list.js
```

#### 2. Deletar Tabelas:

Para deletar todas as tabelas disponíveis no sistema, execute o seguinte comando:

```bash
node src/services/delete.js
```

---

## Demonstração Código Resumido

#### - `models/User.js`

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
```

<br>

#### - `database.js`

```javascript
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB!');
  } catch (err) {
    console.error('Erro ao conectar:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
```

<br>

#### - `index.js`

```javascript
const connectDB = require('./src/database');
const seedData = require('./src/seed');
const User = require('./src/models/User');

const start = async () => {
  await connectDB();
  const newUser = await seedData();
  console.log('Dados iniciais criados:', newUser);
};

start();
```

---

## Tecnologias

<img src="https://media.giphy.com/media/iT138SodaACo9LImgi/giphy.gif" align="center" height="75" width="75"> Tecnologias utilizadas no projeto:

- `JavaScript (JS)`
  "Linguagem de Programação do Navegador".
  "Scripting Dinâmico para Web".
  <br>

- `Node.js`
  "Ambiente de Execução JavaScript do Lado do Servidor".
  "Servidor Escalável em JavaScript".
  <br>

- `Documentation.md`
  "Guia detalhado para uso e manutenção do projeto."
  "Referência central para funcionalidades, práticas e requisitos."
  <br>

- `Git`
  "Sistema de controle de versões"
  <br>

- `Github`
  "Plataforma para hospedagem de código-fonte"
  <br>

- `Visual Studio Code`
  "Editor de código-fonte"
  <br>

---

## Licença

- Esse projeto está sob a licença MIT.
  <br>

---

<img src="https://media.giphy.com/media/ImmvDZ2c9xPR8gDvHV/giphy.gif" align="center" height="25" width="25"> Autor

<p>
    <img align=left margin=10 width=80 src="https://avatars.githubusercontent.com/u/87991807?v=4"/>
    <p>&nbsp&nbsp&nbspRafaelRaizer-Dev<br>
    &nbsp&nbsp&nbsp<a href="https://api.whatsapp.com/send/?phone=47999327137">Whatsapp</a>&nbsp;|&nbsp;<a href="https://www.linkedin.com/in/rafael-raizer//">LinkedIn</a>&nbsp;|&nbsp;<a href="https://github.com/RaizerTechDev">GitHub</a>|&nbsp;<a href="https://public.tableau.com/app/profile/rafael.raizer">Tableau</a>|&nbsp;<a href="https://raizertechdev-portfolio.netlify.app/">Portfólio</a>&nbsp;</p>
</p>
