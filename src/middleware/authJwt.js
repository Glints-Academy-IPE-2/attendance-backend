const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};


const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({
    email
  });
  if (!user) throw new Error("Email does not exist");

  let token = await Token.findOne({
    userId: user.userId
  });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user.userId,
    token: hash,
    createAt: Date.now()
  }).save()

  const link = `${clientURL}/pub/passwordReset?token=${resetToken}&id=${user._id}`;

  sendEmail(
    user.email,
    "Password Reset Request", {
      name: user.name,
      link: link,
    },
    "../utils/email/equestResetPassword.handlebars"
  );
  return link;
}

const resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({
    userId
  });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token!");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne({
    id: userId
  }, {
    $set: {
      password: hash
    }
  }, {
    new: true
  })
}


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  requestPasswordReset: requestPasswordReset,
  resetPassword: resetPassword
};

module.exports = {
  authJwt
};