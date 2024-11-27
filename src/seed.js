const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const Review = require('./models/Review');

const seedData = async () => {
  try {
    // Criar um novo usuário
    const existingUser = await User.findOne({ email: 'jean@gmail.com' });

    let newUser;
    if (!existingUser) {
      // Criar novo usuário se não existir
      newUser = await User.create({
        name: 'Jean Ribeiro',
        email: 'jean@gmail.com',
        password: '123456',
      });
      console.log('Novo Usuário criado:', newUser);
    } else {
      newUser = existingUser;
      console.log('Usuário já existente:', newUser);
    }

    // Criar os dois lugares (Beach House e Mountain Cabin)
    const place1 = await Place.create({
      name_place: 'Beach House',
      address: '123 Ocean Drive',
      price_per_night: 150,
      user_id: newUser._id, // Relacionando o lugar com o usuário
    });

    const place2 = await Place.create({
      name_place: 'Mountain Cabin',
      address: '456 Mountain Trail',
      price_per_night: 200,
      user_id: newUser._id, // Relacionando o lugar com o usuário
    });

    console.log('Lugares criados: ', place1.name_place, place2.name_place);

    //Vai filtrar selecionando, atualizando e excluindo o lugar específico pelo usuário:

    // Escolhe entre os dois lugares (exemplo: Beach House ou Mountain Cabin)
    const selectedPlace = 'Mountain Cabin'; // Aqui você pode pegar a escolha do usuário (por exemplo, de um formulário)

    // Atualiza o user_id para o lugar escolhido
    if (selectedPlace === 'Mountain Cabin') {
      // Mantém o lugar escolhido (Beach House)
      console.log(
        `Usuário "${newUser.name}" escolheu o lugar "${place2.name_place}".`,
      );

      // Exclui o outro lugar (Mountain Cabin)
      await Place.findByIdAndDelete(place1._id);
      console.log(
        `O lugar "${place1.name_place}" foi excluído, pois não foi escolhido.`,
      );
    }

    // Criando uma reserva
    const booking1 = await Booking.create({
      user_id: newUser._id,
      place_id: place2._id, // Referência ao lugar escolhido
      check_in: new Date('2024-11-15'),
      check_out: new Date('2020-11-20'),
      status: 'confirmed',
    });
    console.log('Reserva criada:', booking1);

    // Criando avaliação
    const review = await Review.create({
      booking_id: booking1._id,
      user_id: newUser._id,
      rating: 3,
      comment: 'Lugar não estava limpo!',
    });
    console.log('Avaliação criada:', review);

    console.log('Dados fictícios criados com sucesso!');

    return newUser; // Retorna o usuário criado
  } catch (err) {
    console.error('Erro ao criar dados:', err);
  }
};

module.exports = seedData;
