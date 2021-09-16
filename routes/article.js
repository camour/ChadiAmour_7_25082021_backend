const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const auth = require('../middlewares/auth');
const checkXSS = require('../middlewares/xss');

router.get('/', auth, checkXSS, articleController.getAllArticlesAndComments);
router.put('/:articleId', auth, checkXSS, articleController.modifyArticle);
router.delete('/:articleId', auth, checkXSS, articleController.deleteArticle);
router.post('/', auth, checkXSS, articleController.createNewArticle);

module.exports = router;