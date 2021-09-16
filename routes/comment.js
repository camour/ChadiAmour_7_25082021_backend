const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require('../middlewares/auth');
const XSS = require('../middlewares/xss');

router.post('/:articleId', auth, XSS, commentController.createComment);
router.put('/:commentId', auth, XSS, commentController.modifyComment);
router.delete('/:commentId', auth, XSS, commentController.deleteComment);

module.exports = router;