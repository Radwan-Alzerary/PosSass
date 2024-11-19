// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    let errors = { username: '', email: '', password: '', systemId: '' };

    // Duplicate error code
    if (err.code === 11000) {
        if (err.keyValue.email) {
            errors.email = 'Email is already registered';
        }
        if (err.keyValue.username) {
            errors.username = 'Username is already taken';
        }
        if (err.keyValue.systemId) {
            errors.systemId = 'System ID is already in use';
        }
        return errors;
    }

    // Validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // Incorrect email or systemId
    if (err.message === 'Incorrect email') {
        errors.email = 'Email not registered';
    }
    if (err.message === 'Incorrect system ID') {
        errors.systemId = 'Incorrect System ID';
    }

    return errors;
};

// Create JWT
const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};

// Controller actions
module.exports.register_get = (req, res) => {
    res.render('register');
};

// controllers/authController.js

module.exports.register_post = async (req, res) => {
    const { username, email, password, systemId } = req.body;

    try {
        const user = await User.create({ username, email, password, systemId });
        const token = createToken(user._id);

        // Set cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.redirect('/dashboard');
    } catch (err) {
        const errors = handleErrors(err);
        res.render('register', { errors });
    }
};
// controllers/authController.js

module.exports.login_post = async (req, res) => {
    const { password,email, systemId } = req.body;
    console.log(req.body)
    try {
        const user = await User.loginWithSystemId(systemId,email, password);
        const token = createToken(user._id);
        console.log(token)
        // Set cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            // secure: process.env.NODE_ENV === 'production', // Send cookie over HTTPS only in production
        });

        res.redirect('/dashboard');
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors)
        res.render('login', { errors });
    }
};


module.exports.login_get = (req, res) => {
    res.render('auth/login');
};

// controllers/authController.js

module.exports.dashboard_get = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        console.log(user)
        res.render('auth/dashboard', { username: user });
    } catch (err) {
        console.log(err)

        res.redirect('auth/login');
    }
};

// controllers/authController.js

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); // Overwrite the cookie to expire immediately
    res.redirect('/login');
};
