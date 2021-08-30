let mysql = require('mysql2');
let dataBase = require('../config');

exports.selectArticles = () => {

    let selectQuery = 'SELECT Articles.id AS articleId, Articles.subject AS articleSubject, Articles.content AS articleContent, Articles.publishingDate AS articlePublishingDate, User.userName AS articleUserName FROM Articles INNER JOIN User ON Articles.userId = User.id';
    return new Promise((resolve, reject) => {
        dataBase.query(selectQuery, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    }); 
};

exports.selectComments = (articleId, commentsArray) => {
    
        let selectQuery = 'SELECT  Comments.id AS commentId, Comments.content AS commentContent, Comments.publishingDate AS commentPublishingDate, User.userName AS commentUserName FROM Comments INNER JOIN User ON Comments.userId = User.id WHERE Comments.articleId = ' + articleId;
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
