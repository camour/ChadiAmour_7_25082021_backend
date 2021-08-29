let functions = require('../mysql/Article/functions');

exports.getAllArticles = (request, response, next) =>{
    functions.selectArticles()
    .then(result => {
        console.log(result);
        response.status(200).json({message: 'articles ready !'});
    })
    .catch(error => {
        response.status(404).json({message: 'ressources not found'});
    });
};