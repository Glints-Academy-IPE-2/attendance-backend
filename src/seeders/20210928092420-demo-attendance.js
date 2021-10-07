'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Attendance', [{
      checkin: new Date(),
      checkout: new Date(),
      
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Attendance', null, {});
  }
};