

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [users] = await queryInterface.sequelize.query(
      'SELECT id from COURSES;',
    );


    return queryInterface.bulkInsert('Attendances', [{
      UserId: users[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Attendances', null, {}),
};
