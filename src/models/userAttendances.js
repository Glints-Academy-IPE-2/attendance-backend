'use strict';
module.exports = (sequelize, DataTypes) => {
  const userAttendance = sequelize.define('userAttendance', {
    userId: {
      type: DataTypes.STRING,
      required: true,
      ref: "User",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "343512"
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 900,
    },
  }, {});
  userAttendance.associate = function(models) {
    // associations can be defined here
  };
  return userAttendance;
};