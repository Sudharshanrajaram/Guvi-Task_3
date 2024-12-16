const express = require('express');
const router = express.Router();
const { resetRequest,
    validateToken,
    resetPassword,
    createUser,
    loginUser } = require('../controllers/userController');



router.post('/reset-password', resetRequest);
router.get('/reset-password/vali/:token', validateToken);
router.post('/reset-password/:token', resetPassword);
router.post('/signup', createUser);
router.post('/login', loginUser);


module.exports = router;