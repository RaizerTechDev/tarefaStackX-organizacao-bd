const connectDB = require('./src/database');
const seedData = require('./src/seed');

const User = require('./src/models/User');
const Place = require('./src/models/Place');
const Booking = require('./src/models/Booking');
const Review = require('./src/models/Review');

const showTables = async (newUser) => {
  try {
    // Buscar todos os usuários
    const users = await User.find().lean();
    console.log('Tabela Usuários:');
    console.table(
      users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      })),
    );

    // Buscar todos os lugares e os usuários associados
    const places = await Place.find().populate('user_id', 'name email').lean();

    console.log('Tabela Lugares:');
    console.table(
      places.map((place) => ({
        id: place._id,
        name: place.name_place,
        user: place.user_id
          ? `${place.user_id.name} (${place.user_id.email})`
          : 'Nenhum usuário associado',
        address: place.address,
        price_per_night: place.price_per_night,
      })),
    );

    // Buscar reservas e exibir
    const bookings = await Booking.find()
      .populate('user_id', 'name') // Popula a referência 'user_id' com o campo 'name'
      .populate('place_id', 'name_place address price_per_night') // Popula a referência 'place_id' com os campos desejados
      .lean(); // Retorna um objeto simples (não um Mongoose Document)

    console.log('Reservas:');
    console.table(
      bookings.map((booking) => ({
        id: booking._id,
        user: booking.user_id ? booking.user_id.name : 'Usuário não encontrado',
        place: booking.place_id
          ? `${booking.place_id.name_place}`
          : 'Lugar não encontrado',
        check_in: booking.check_in,
        check_out: booking.check_out,
        status: booking.status,
      })),
    );

    // Buscar avaliações e exibir
    const reviews = await Review.find()
      .populate('booking_id', 'check_in check_out')
      .populate('user_id', 'name')
      .lean();

    console.log('Avaliações:');
    console.table(
      reviews.map((review) => ({
        id: review._id,
        booking_id: review.booking_id._id,
        user: review.user_id ? review.user_id.name : 'Usuário não encontrado',
        rating: review.rating,
        comment: review.comment,
      })),
    );
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

const start = async () => {
  await connectDB();

  // Agora, o usuário criado será passado para a função showTables
  const newUser = await seedData(); // Recebe o usuário criado
  await showTables(newUser); // Passa o usuário para showTables
};

start();
