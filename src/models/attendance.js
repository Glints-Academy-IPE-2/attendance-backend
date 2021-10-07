'use strict';

module.exports = (sequelize, DataTypes) => {
  const Attendances = sequelize.define('Attendances', {
    checkin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
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