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




