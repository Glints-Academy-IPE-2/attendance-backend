/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';
import { User, Attendances } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const {
  requestPasswordReset,
  resetPassword,
} = require('../../middleware/authJwt');

const CLIENT_ID = '990618082111-ff735j3j5bc1222m0qc4h1bhqr67pomt.apps.googleusercontent.com';
const CLIENT_SECRET = '5SZD6sV1Bp_O83kHFX0iveXk';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//0422SCXweBnP3CgYIARAAGAQSNwF-L9IrzLe-gd7fmhwtAxvhd0f61vYVRkIHSwMrU5L9LHldaipe9M8J-7PFYfNQTmqxjTYeBoc';
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

export const sendMail = async ({
  from = 'This is from IPE <testingalvi@gmail.com>',
  to = 'example@gmail.com',
  subject = 'Attendance Apps',
  text = '<h1>Hello from gmail email using API</h1>',
  html = '',
}) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: 'testingalvi@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

export const register = async (req, res) => {
  try {
    const {
      username, email, password,
    } = req.body;
    if (process.env.IS_GOOGLE_AUTH_ENABLE === 'true') {
      if (!req.body.code) {
        throw new Error('code must be defined');
      }
      const { code } = req.body;
      const customUrl = `${process.env.GOOGLE_CAPTCHA_URL}?secret=${process.env.GOOGLE_CAPTCHA_SECRET_SERVER}&response=${code}`;
      const response = await axios({
        method: 'post',
        url: customUrl,
        data: {
          secret: process.env.GOOGLE_CAPTCHA_SECRET_SERVER,
          response: code,
        },
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      });
      if (!(response && response.data && response.data.success === true)) {
        throw new Error('Google captcha is not valid');
      }
    }

    const user = await User.findOne({
      where: {
        email
      },
    });
    const usernames = await User.findOne({
      where: {
        username
      }
    })
    if (user) {
      throw new Error('User already exists with same email');
    } else if (usernames) {
      throw new Error('User already exists with same username');
    }
    

    const reqPass = crypto.createHash('md5').update(password).digest('hex');
    const token = jwt.sign(
      {
        user: {
          email: req.body.email,
          password: req.body.password,
        },
      },
      process.env.SECRET,
    );

    const payload = {
      username,
      email,
      password: reqPass,
      isVerified: false,
      verifiedToken: token,
    };

    await User.create(payload);

    sendMail({
      from: 'This is from IPE <testingalvi@gmail.com>',
      to: email,
      subject: `Hello ${req.body.username}`,
      text: '<h1>Hello from gmail email using API</h1>',
      html: `Verify token <a href="http://localhost:8000/login?token=${token}&username=${username}">Klik disini<a>`,
    })
      .then(result => console.log('Email sent...', result))
      .catch(error => console.log(error.message));

    return successResponse(req, res, {
      username,
      email,
      verifiedToken: token,
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const verifyUser = async (req, res) => {
  try {
    const { body: { token = '' } = {} } = req || {};

    jwt.verify(token, process.env.SECRET);

    const [updated] = await User.update({ isVerified: true }, {
      where: { verifiedToken: token },
    });

    if (updated) {
      await User.findOne({
        where: { verifiedToken: token },
      });
    } else {
      throw new Error('User is not updated.');
    }

    return successResponse(req, res, 'user is verified');
  } catch (err) {
    return errorResponse(req, res, err.message);
  }
};


export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('Incorrect Email!');
    }
    const reqPass = crypto
      .createHash('md5')
      .update(req.body.password || '')
      .digest('hex');
    if (reqPass !== user.password) {
      throw new Error('Incorrect Password');
    }

    if (!user.isVerified || !user.isApproved) {
      return errorResponse(req, res, 'Please verify your user');
    }

    const token = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET,
    );

    delete user.dataValues.password;
    return successResponse(req, res, {
      user,
      token,
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const checkVerified = async (req, res) => {
  try {
   
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const requestResetPasswordController = async (req, res) => {
  try {
    const requestPasswordResetService = await requestPasswordReset(
      req.body.email,
    );
    return res.json(requestPasswordResetService);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


// not yet
export const resetPasswordController = async (req, res) => {
  try {
    const resetPasswordService = await resetPassword(
      req.body.userId,
      req.body.token,
      req.body.password,
    );
    return res.json(resetPasswordService);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// const {
//   id
// } = req.params;

// const user = await User.findById(req.params.userId);
// if (!user) return res.status(400).send("Invalid link or expired");

// const token = await Token.findOne({
//   userId: user.id,
//   token: req.params.token
// });
// if (!token) return res.status(400).send("Invalid link or expired");

// user.password = req.body.password;
// await user.save();
// await token.delete();

// res.send("password reset sucessfully.");

export const profile = async (req, res) => {
  try {
    const { user } = req.user;
    const userId = await User.findOne({
      where: {
        id: user,
      },
    });
    return successResponse(req, res, {
      userId,
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
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

export const updateUserById = async (req, res) => {
  try {
    User.update(
      {
        phone: req.body.phone,
        password: req.body.password,
        avatar: req.body.avatar,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    ).then(result => res.json(result));
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: {
        id,
      },
    });
    if (deleted) {
      return res.status(204).send('User deleted');
    }
    return res.status(400).send('Failed to delete');

    throw new Error('User not found');
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const checkin = async (req, res) => {
  try {
    // join id attendance to id user
    Attendances.update(
      {
        checkin: req.body.checkin
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(result => res.json(result));
    // return res.status(200).send('todos');
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const checkout = async (req, res) => {
  try {
    const {createdAt} = req.body;
    // return res.status(200).send('checkout');
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// not yet
export const getLocation = async (req, res) => {
  try {
    return res.status(200).send('todos');
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
