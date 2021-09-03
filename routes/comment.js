const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require('../middlewares/auth');

router.post('/:articleId', auth, commentController.createComment);
router.put('/:commentId', auth, commentController.modifyComment);

module.exports = router;