const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require('../middlewares/auth');

router.post('/:articleId', auth, commentController.createComment);

module.exports = router;