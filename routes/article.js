const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/article');

router.get('/', articlesController.getAllArticlesAndComments);
router.put('/:articleId', articlesController.modifyArticle);

module.exports = router;