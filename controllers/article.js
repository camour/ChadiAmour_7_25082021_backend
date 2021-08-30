let functions = require('../mysql/Article/functions');

exports.getAllArticlesAndComments = (request, response, next) =>{
    
    functions.selectArticles()
    .then(async(articles) => {
        for(let article of articles){
            article.comments = new Array();
            await functions.selectComments(article.articleId, article.comments);
        }
        response.status(200).json({articlesArray: articles});
    })
    .catch(error => {
        response.status(404).json({message: 'ressources not found'});
    });
};