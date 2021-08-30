const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/article');

router.get('/', articlesController.getAllArticlesAndComments);



module.exports = router;