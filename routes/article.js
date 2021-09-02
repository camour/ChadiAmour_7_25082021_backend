const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/article');
const auth = require('../middlewares/auth');

router.get('/', auth, articlesController.getAllArticlesAndComments);
router.put('/:articleId', auth, articlesController.modifyArticle);
router.delete('/:articleId', auth, articlesController.deleteArticle);
router.post('/', auth, articlesController.createNewArticle);

module.exports = router;