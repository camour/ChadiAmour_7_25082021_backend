let mysql = require('mysql2');
let dataBase = require('../config');

exports.selectArticles = () => {
    //let selectQuery = 'SELECT Articles.id AS articleId, Articles.subject AS articleSubject, Articles.content AS articleContent, Articles.userId AS articleUserId, comment.id AS commentId, comment.articleId AS commentArticleId  FROM Articles, Comments WHERE articleId = commentArticleId';
    let selectQuery = 'SELECT Articles.id AS articleId, Articles.subject AS articleSubject, Articles.content AS articleContent, Articles.userId AS articleUserId FROM Articles';

    return new Promise((resolve, reject) => {
        dataBase.query(selectQuery, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    }); 
};