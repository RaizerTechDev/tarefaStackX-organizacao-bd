# Organização Banco de Dados - Airbnb

# Sumário

- [1. Organização e Estrutura do Projeto](#1-organização-e-estrutura-do-projeto)
  - [1.1 Na Raiz](#11-na-raiz)
  - [1.2 Pasta `src`](#12-pasta-src)
    - [1.2.1 Organização por Responsabilidades](#121-organização-por-responsabilidades)
  - [1.3 Conexão e Configuração do Banco de Dados](#13-conexão-e-configuração-do-banco-de-dados)
  - [1.4 Uso do MongoDB e Mongoose](#14-uso-do-mongodb-e-mongoose)
  - [1.5 Flexibilidade e Escalabilidade](#15-flexibilidade-e-escalabilidade)
- [2. Decisões de Design](#2-decisões-de-design)
  - [2.1 Relacionamentos](#21-relacionamentos)
  - [2.2 Estrutura e Campos](#22-estrutura-e-campos)
  - [2.3 Demonstração Tabelas](#23-demonstração-tabelas)
    - [- `models/User.js`](#--modelsuserjs)
    - [- `models/Place.js`](#--modelsplacejs)
    - [- `models/Booking.js`](#--modelsbookingjs)
    - [- `models/Review.js`](#--modelsreviewjs)
- [4. Conclusão](#4-conclusão)

---

## 1. Organização e Estrutura do Projeto

A estrutura do projeto foi projetada com foco em **separação de responsabilidades, modularidade e escalabilidade**, garantindo clareza, manutenibilidade e crescimento sustentável.

### 1.1 Na Raiz

- **`index.js`**

  - Inicializa o projeto conectando ao banco de dados via `connectDB` (definido em `database.js`).
  - Popula o banco com dados iniciais usando `seedData`.
  - Realiza consultas às tabelas `User`, `Place`, `Booking` e `Review`, exibindo informações formatadas no terminal.
  - Utiliza `populate` para buscar e exibir dados relacionados, como `user_id` e `place_id`.

- **`.env`**
  - Contém variáveis de ambiente, como a URL do MongoDB Atlas, promovendo segurança e flexibilidade.

### 1.2 Pasta `src`

#### 1.2.1 Organização por Responsabilidades

- **`models`**: Modelos separados por arquivo, garantindo modularidade:

  - **`User.js`**: Define usuários com campos como `name`, `email`, `password` e `created_at`.
  - **`Place.js`**: Representa locais cadastrados por usuários, referenciando `user_id`.
  - **`Booking.js`**: Conecta `User` e `Place`, rastreando status e datas de reserva.
  - **`Review.js`**: Relaciona usuários e hospedagens, armazenando avaliações com `rating` e `comment`.

- **`services`**:
  - Contém funções reutilizáveis para operações de exclusão e listagem de dados.

### 1.3 Conexão e Configuração do Banco de Dados

- **`database.js`**

  - Centraliza a lógica de conexão, facilitando manutenção e alterações futuras.

- **`seed.js`**
  - Popula o banco com dados de exemplo, ideal para testes controlados.

### 1.4 Uso do MongoDB e Mongoose

- O **Mongoose** foi escolhido para definir schemas claros e gerenciar relacionamentos.
- **`populate`** melhora a organização e a exibição de informações relacionadas.

### 1.5 Flexibilidade e Escalabilidade

- Arquivos pequenos e com responsabilidades únicas permitem escalabilidade sem comprometer a estrutura.
- A separação de responsabilidades simplifica o código e colabora para o trabalho em equipe.

---

## 2. Decisões de Design

### 2.1 Relacionamentos

- O uso de **ObjectId** cria uma estrutura robusta de relações entre tabelas:
  - **`Users`** conecta-se a **`Places`** (locais cadastrados).
  - **`Users`** e **`Places`** relacionam-se com **`Bookings`** (reservas).
  - **`Bookings`** e **`Users`** estão ligados a **`Reviews`** (avaliações).
- **`populate`** é usado para exibir dados relacionados com facilidade.

### 2.2 Estrutura e Campos

Cada tabela contém campos essenciais para sua funcionalidade:

- **`Users`**: Campos para nome, email e senha (para autenticação).
- **`Places`**: Detalhes do local, como `name_place`, `address` e `price_per_night`.
- **`Bookings`**: Campos para status e datas de reserva.
- **`Reviews`**: Armazena notas e comentários dos usuários.

---

### 2.3 Demonstração Tabelas

#### - `models/User.js`

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
```

<br>

#### - `models/Place.js`

```javascript
const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Garantir que o nome do modelo "User" está correto
    required: true, // Este campo é obrigatório
  },
  name_place: { type: String, required: true },
  address: { type: String, required: true },
  price_per_night: { type: Number, required: true },
});

module.exports = mongoose.model("Place", PlaceSchema);
```

<br>

#### - `models/Booking.js`

```javascript
const mongoose = require("mongoose"); // Importação do mongoose

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  place_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  check_in: { type: Date, required: true },
  check_out: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  created_at: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking; // Exportar o modelo
```

<br>

#### - `models/Review.js`

```javascript
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
```

---

## 4. Conclusão

A estrutura reflete uma abordagem profissional, garantindo que o código seja sustentável, escalável e compreensível para outros desenvolvedores ou para manutenções futuras. Cada decisão foi tomada para balancear eficiência e organização, promovendo um sistema robusto e flexível.
