const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/article');

router.get('/', articlesController.getAllArticles);



module.exports = router;