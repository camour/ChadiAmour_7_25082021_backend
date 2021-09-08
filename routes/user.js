const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');

router.post('/signIn', userController.signIn);
router.post('/signUp', multer, userController.signUp);
router.get('/user/:userId', auth, userController.user);
router.delete('/user/:userId', auth, userController.deleteUser);
module.exports = router;