const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const XSS = require('../middlewares/xss');

router.post('/signIn', XSS, userController.signIn);
router.post('/signUp', XSS, multer, userController.signUp);
router.get('/user/:userId', auth, XSS, userController.user);
router.delete('/user/:userId', auth, XSS, userController.deleteUser);

module.exports = router;