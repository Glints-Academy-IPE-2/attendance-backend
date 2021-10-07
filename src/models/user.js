'use strict';
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
      defaultValue: false
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: -112256432
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: -121456432
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Attendances, {
      
    })
  };
  return User;
};