

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('userAttendances', {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      ref: 'User',
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '343512',
    },
    user_id: {
      type: DataTypes.INTEGER,
      required: true,
      ref: 'User',
    },
    attendance_id: {
      type: DataTypes.INTEGER,
      require: true,
      ref: 'Attendance',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      expires: 3600,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('userAttendances'),
};
