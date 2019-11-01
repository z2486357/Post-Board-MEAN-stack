const express = require('express');
const bcrypt = require('bcrypt');
// npm install --save bcrypt
// for changing password to unreadable string
const jwt = require('jsonwebtoken');
// npm install --save jsonwebtoken
const router = express.Router();
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User Created!',
        result: result
      })
    }).catch(err => {
      res.status(500).json({
        error: err
      })
    })
  });

})

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(
    user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth Failed!'
        })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password)
    }
  ).then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth Failed!'
      })
    }
    const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
      'secret_this_should_be_longer_random_string', { expiresIn: "1h" });

    return res.status(200).json({
      token: token
    })

  }).catch(err => {
    return res.status(401).json({
      message: 'Auth Failed!'
    })
  })
});


module.exports = router;
