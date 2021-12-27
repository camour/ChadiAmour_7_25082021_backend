const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const auth = require('../middlewares/auth');
const XSS = require('../middlewares/xss');

router.get('/', auth, XSS, articleController.getAllArticlesAndComments);
router.put('/:articleId', auth, XSS, articleController.modifyArticle);
router.delete('/:articleId', auth, XSS, articleController.deleteArticle);
router.post('/', auth, XSS, articleController.createNewArticle);

module.exports = router;