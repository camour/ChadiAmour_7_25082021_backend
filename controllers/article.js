let functions = require('../mysql/Article/functions');

exports.getAllArticlesAndComments = (request, response, next) =>{    
    functions.selectArticles()
    .then(async(articles) => {  
              
        for(let article of articles){
            article.comments = new Array();
            //using promises is the only to retry comments linked to our articles
            // the promise below is going to fill in our comments array with delete its memory address
            // in fact if we try to get the return result from database.query, we will get an array which
            // address has runned out
            await functions.selectComments(article.articleId, article.comments);            
        }        
        response.status(200).json({articlesArray: articles});
    })
    .catch(error => {
        response.status(404).json({message: 'ressources not found'});
    });
};

exports.modifyArticle = (request, response, next) => { 
    functions.updateArticle(request.params.articleId, 
        request.body.userId, 
        request.body.article.articleSubject, 
        request.body.article.articleContent
        )
    .then(result => {
        response.status(200).json({message: 'ressource modified !'});
    })
    .catch(error => {
        response.status(400).json({message: 'cannot find ressource'});
    })
};

exports.deleteArticle = (request, response, next) => {
    functions.deleteArticle(request.params.articleId, request.body.userId)
    .then(result => {
        return functions.deleteArticleComments(request.params.articleId);
    })
    .then(result => {
        response.status(200).json({message: 'ressource deleted ! '});
    })
    .catch(error => {
        response.status(400).json({message: 'cannot find ressource !'});
    });
};

exports.createNewArticle = (request, response, next) => {
    functions.insertNewArticle(request.body.userId, request.body.newArticleToAdd)
    .then(result => {
        response.status(200).json({message: 'ressource created !', articleId: result.insertId});
    })
    .catch(error => {
        response.status(400).json({message: 'cannot create ressource !'});
    })
};