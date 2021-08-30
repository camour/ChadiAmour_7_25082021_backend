let mysql = require('mysql2');
let dataBase = require('../config');

exports.selectArticles = () => {

    let selectQuery = 'SELECT Articles.id AS articleId, Articles.subject AS articleSubject, Articles.content AS articleContent, Articles.userId AS articleUserId, Articles.publishingDate AS articlePublishingDate FROM Articles';
    return new Promise((resolve, reject) => {
        dataBase.query(selectQuery, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    }); 
};

exports.selectComments = (articleId, commentsArray) => {
    
        let selectQuery = 'SELECT  Comments.id AS commentId, Comments.content AS commentContent, Comments.userId AS commentUserId, Comments.publishingDate AS commentPublishingDate FROM Comments WHERE Comments.articleId = ' + articleId;
        return new Promise((resolve, reject) => {
            dataBase.query(selectQuery, (error, result) => {
                if(!error){
                    for(let index in result){
                        commentsArray.push({...result[index]});
                    }                    
                    resolve(commentsArray);
                }
            });
        }); 
};

exports.test = (variable) => {

    variable.push(2);
}
