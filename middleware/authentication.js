// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("req.cookies.jwt",req.cookies)
console.log("token",token)
  // Check if token exists
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
console.log(token)
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
