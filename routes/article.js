const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const auth = require('../middlewares/auth');

router.get('/', auth, articleController.getAllArticlesAndComments);
router.put('/:articleId', auth, articleController.modifyArticle);
router.delete('/:articleId', auth, articleController.deleteArticle);
router.post('/', auth, articleController.createNewArticle);

module.exports = router;