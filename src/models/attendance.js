'use strict';
const db = {};
const User1 = require("./index")
const Attendance = require("./index")
const User2 = require("./index")

module.exports = (sequelize, DataTypes) => {
  const Attendances = sequelize.define('Attendances', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    checkin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {});
  Attendances.associate = function (models) {
    User1, Attendance, User2
  };

  Attendances.init({
    checkin: DataTypes.DATE,
    checkout: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Attendances',
  });
  return Attendances;
};