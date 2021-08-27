const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signIn', userController.signIn);
//router.post('/signUp', userController.signUp);

module.exports = router;