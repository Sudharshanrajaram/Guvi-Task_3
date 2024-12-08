const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getInfo } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/info', authMiddleware, getInfo);


module.exports = router;