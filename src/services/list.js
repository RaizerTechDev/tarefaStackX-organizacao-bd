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

    // Chamar as funções de listagem após conectar ao banco de dados
    await listUsers();
    await listPlaces();
    await listBookings();
    await listReviews();

    process.exit(0); // Finaliza o processo com sucesso após listar os dados
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
};

// Listar todos os usuários
const listUsers = async () => {
  try {
    const users = await User.find({});
    console.log('Usuários:', users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
  }
};

// Listar todos os lugares
const listPlaces = async () => {
  try {
    const places = await Place.find({});
    console.log('Lugares:', places);
  } catch (err) {
    console.error('Erro ao listar lugares:', err);
  }
};

// Listar todas as reservas
const listBookings = async () => {
  try {
    const bookings = await Booking.find({});
    console.log('Reservas:', bookings);
  } catch (err) {
    console.error('Erro ao listar reservas:', err);
  }
};

// Listar todas as avaliações
const listReviews = async () => {
  try {
    const reviews = await Review.find({});
    console.log('Avaliações:', reviews);
  } catch (err) {
    console.error('Erro ao listar avaliações:', err);
  }
};

// Chamar função de conexão
connectDB();
