require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Place = require('../models/Place');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Erro: MONGODB_URI não está definido no arquivo .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB!');

    // Chamar as funções de exclusão após conectar ao banco de dados
    await deleteUsers();
    await deletePlaces();
    await deleteBookings();
    await deleteReviews();

    process.exit(0); // Finaliza o processo com sucesso após as exclusões
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
};

// Excluir todos os usuários
const deleteUsers = async () => {
  try {
    const result = await User.deleteMany({});
    console.log('Usuários excluídos:', result);
  } catch (err) {
    console.error('Erro ao excluir usuários:', err);
  }
};

// Excluir todos os lugares
const deletePlaces = async () => {
  try {
    const result = await Place.deleteMany({});
    console.log('Lugares excluídos:', result);
  } catch (err) {
    console.error('Erro ao excluir lugares:', err);
  }
};

// Excluir todos as reservas
const deleteBookings = async () => {
  try {
    const result = await Booking.deleteMany({});
    console.log('Reservas excluídas:', result);
  } catch (err) {
    console.error('Erro ao excluir reservas:', err);
  }
};

// Excluir todos as avaliações
const deleteReviews = async () => {
  try {
    const result = await Review.deleteMany({});
    console.log('Avaliações excluídos:', result);
  } catch (err) {
    console.error('Erro ao excluir avaliações:', err);
  }
};

// Chamar função de conexão
connectDB();
