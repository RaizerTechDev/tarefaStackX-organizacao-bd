const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Garantir que o nome do modelo "User" está correto
    required: true, // Este campo é obrigatório
  },
  name_place: { type: String, required: true },
  address: { type: String, required: true },
  price_per_night: { type: Number, required: true },
});

module.exports = mongoose.model('Place', PlaceSchema);
