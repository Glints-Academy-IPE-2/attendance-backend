/* eslint-disable consistent-return */
import {
  User, Attendance
} from '../../models';
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

    const [updated] = await User.update({ isApproved: true }, {
      where: { verifiedToken: token },
    });

    const user = await User.findOne({
      where: { verifiedToken: token },
    });

    console.log(token);
    
    if (updated) {
      const { email, username } = await User.findOne({
        where: { verifiedToken: token },
      });
      sendMail({
        from: 'This is from IPE <testingalvi@gmail.com>',
        to: email,
        subject: `Hello ${username}`,
        text: '<h1>Hello from gmail email using API</h1>',
        html: `Verify token <a href="http://localhost:8000/login?token=${token}&username=${username}">Klik disini<a>`,
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

// not yet
export const getAllAttendance = async (req, res) => {
  try {
    const users = await User.findAll({ include: Attendance });
    // console.log(JSON.stringify(users, null, 2));
    return successResponse(req, res, {users})

  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

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
   }).then(function(rowDeleted){ 
     if(rowDeleted === 1){
        successResponse(req, res, {rowDeleted})
      }
   }, function(err){
       console.log(err); 
   });

  // return successResponse(req, res, "User successfully deleted.")

  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};