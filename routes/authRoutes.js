// routes/authRoutes.js
const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authentication');
const router = Router();

router.get('/register', authController.register_get);
router.post('/register', authController.register_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/dashboard', authController.dashboard_get);
router.get('/logout', authController.logout_get);

module.exports = router;
