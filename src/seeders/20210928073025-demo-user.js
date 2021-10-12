'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'ipeglints',
      email: 'testingalvi@gmail.com',
      password: 'cc03e747a6afbbcbf8be7668acfebee5',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};