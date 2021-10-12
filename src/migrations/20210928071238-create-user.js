

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ipe2glints',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'testingalvi@gmail.com',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'userpass',
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'default-avatar.png',
    },
    verifiedToken: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '123',
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
