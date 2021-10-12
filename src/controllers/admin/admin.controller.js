/* eslint-disable consistent-return */
const db = require("../../models");
const User = db.user;
const Attendance = db.attendance;
// import {
//   User, Attendance
// } from '../../models';
import {
  successResponse,
  errorResponse,
} from '../../helpers';
import {
  sendMail
} from '../user/user.controller';

const jwt = require('jsonwebtoken');


export const approveUser = async (req, res) => {
  try {
    const {
      token,
    } = req.params;

    jwt.verify(token, process.env.SECRET);

    const [updated] = await User.update({
      isApproved: true
    }, {
      where: {
        verifiedToken: token
      },
    });

    const user = await User.findOne({
      where: {
        verifiedToken: token
      },
    });

    console.log(token);

    if (updated) {
      const {
        email,
        username
      } = await User.findOne({
        where: {
          verifiedToken: token
        },
      });
      sendMail({
          from: 'This is from IPE <testingalvi@gmail.com>',
          to: email,
          subject: `Hello ${username}`,
          text: '<h1>Hello from gmail email using API</h1>',
          html: `Verify token <a href="http://localhost:3000/login?token=${token}&username=${username}">Klik disini<a>`,
        })
        .then(result => console.log('Email sent...', result))
        .catch(error => console.log(error.message));
    }

    return successResponse(req, res, updated);
  } catch (err) {
    return errorResponse(req, res, err.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAndCountAll({
      order: [
        ['createdAt', 'DESC'],
        ['username', 'ASC'],
      ],
      // offset: (page - 1) * limit,
      // limit,
    });
    return successResponse(req, res, {
      users,
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    return User.findAll({
      include: ['attendance'],
    }).then((user) => {
      return successResponse(req, res, {
        user
      })
    })
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getAttendanceById = async (req, res) => {
  try{
  User.findByPk(req.params.id, {
    include: [{
      model: Attendance,
      as: "attendance"
    }]
  }).then(user => {
    successResponse(req, res, {user})
  })
} catch (err) {
  errorResponse(req, res, {error})
}
}

export const getLateAttendance = async (req, res) => {
  try {
    try {
      const {id, month} = req.params; 
  
      await Attendance.findAll({
        where: {UserId: id, month: month}
      })
  
      await Attendance.count({
        where : {month: month}
      }).then((user) => {
        const count = user / 2
        if(count < 3) {
          successResponse(req, res, "This user didn't come more than 3 days this month")
        } else {
          successResponse(req, res, "This user passed")
        }
      }) 
  
    } catch (error) {
      return errorResponse(req, res, {error})
    } 
    
  } catch (error) {
    return errorResponse(req, res, {})
  }
}

// export const getMonthAttendance = async (req, res) => {
//   try {
//     Attendance.findByPk({
//       where: {}
//     })
//   } catch (error) {
//     return errorResponse(req, res, {});
//   }
// }

export const getUserById = async (req, res) => {
  try {
    const {
      id,
    } = req.params;

    const userId = await User.findOne({
      where: {
        id
      },
    });

    if (!userId) {
      throw new Error('User not found in database');
    } else {
      return successResponse(req, res, {
        userId
      })
    }
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const deleteUserById = async (req, res) => {
  try {
    const {
      userId
    } = req.params;

    User.destroy({
      where: {
        id: userId
      }
      // jumlah baris yang sudah terdelete
    }).then(function (rowDeleted) {
      if (rowDeleted === 1) {
        successResponse(req, res, {
          rowDeleted
        })
      }
    }, function (err) {
      console.log(err);
    });

  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};