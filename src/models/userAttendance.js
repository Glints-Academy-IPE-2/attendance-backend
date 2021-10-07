'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserAttendance = sequelize.define('UserAttendance', {
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "343512"
    },
    user_id: {
      type: DataTypes.INTEGER,
      required: true,
      ref: "User"
    },
    attendance_id: {
      type: DataTypes.INTEGER,
      require: true,
      ref: "Attendance"
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 900,
    },
  }, {});
  UserAttendance.associate = function (models) {
    
  };
  return UserAttendance;
};