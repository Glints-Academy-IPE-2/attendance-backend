/* eslint-disable consistent-return */
import {
  User,
} from '../../models';
import {
  successResponse,
  errorResponse,
} from '../../helpers';
import { sendMail } from '../user/user.controller';

const jwt = require('jsonwebtoken');


export const approveUser = async (req, res) => {
  try {
    const { body: { token = '' } = {} } = req || {};
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
export const allAttendances = async (req, res) => {
  // eslint-disable-next-line no-empty
  try {


  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const {
      id,
    } = req.params;
    const [updated] = await User.update(req.body, {
      where: {
        id,
      },
    });
    if (updated) {
      const updatedUser = await User.findOne({
        where: {
          id,
        },
      });
      return res.status(200).json({
        user: updatedUser,
      });
    }
    throw new Error('User not found');
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
