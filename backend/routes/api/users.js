const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// const validateSignup = [
//     check('email')
//       .exists({ checkFalsy: true })
//       .isEmail()
//       .withMessage('Please provide a valid email.'),
//     check('username')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 4 })
//       .withMessage('Please provide a username with at least 4 characters.'),
//     check('username')
//       .not()
//       .isEmail()
//       .withMessage('Username cannot be an email.'),
//     check('password')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 6 })
//       .withMessage('Password must be 6 characters or more.'),
//     handleValidationErrors
//   ];
const validateSignup = [
  check('email')
    .isEmail()
    .withMessage('Invalid Email'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
]

//Sign up
router.post('/', validateSignup, async (req, res, next) => {
      const { firstName, lastName, email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);

      const emailfind = await User.findOne({where: {email: email}});

      const usernameFind = await User.findOne({where: {username: username}});

      if (emailfind || usernameFind) {
        const err = new Error('User already exists')
        err.status = 500;
        err.errors = {};

        if(emailfind) err.errors.email = 'User with that email already exists'
        // if(usernameFind) err.errors.username = 'User with that username already exists'
        if(usernameFind) err.errors.username = 'Username must be unique'
        return next (err);
        // err.errors = 'User with that email already exists'
        // return next(err);
      }

      const user = await User.create({ firstName, lastName, email, username, hashedPassword });


      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        // createdAt: user.createdAt,
        // updatedAt: user.updatedAt
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;
