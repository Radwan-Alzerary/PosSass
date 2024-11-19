// controllers/authController.js

const User = require("../models/user");

module.exports.login_get = (req, res) => {
    res.render('login');
  };
  
  module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
  
      // Set cookie
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  
      res.redirect('/dashboard');
    } catch (err) {
      const errors = handleErrors(err);
      res.render('login', { errors });
    }
  };
  