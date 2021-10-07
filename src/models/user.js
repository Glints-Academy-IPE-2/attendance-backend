'use strict';
// const models = require('./index');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "username"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user@gmail.com"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "userpass"
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "default-avatar.png"
    },
    verifiedToken: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "123"
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null
    },
  }, {});
  User.associate = function (models) {
    // User.hasMany(model.attendance,{as: 'attendance', foreignKey: 'id'})
  };
  return User;
};