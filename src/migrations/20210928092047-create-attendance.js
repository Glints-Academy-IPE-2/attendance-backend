

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      checkin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      checkout: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      month: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: "october"
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attendances');
  },
};
