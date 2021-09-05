const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const multer = require('../middlewares/multer-config');

router.post('/signIn', userController.signIn);
router.post('/signUp', multer, userController.signUp);

module.exports = router;