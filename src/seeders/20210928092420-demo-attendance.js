

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Attendances', [{
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Attendances', null, {}),
};
