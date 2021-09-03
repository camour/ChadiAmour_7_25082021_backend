let mysql = require('mysql2');
let dataBase = require('../config');

exports.insertNewComment = (commentArticleId, commentUserId, newComment) => {
    let insertQuery = 'INSERT INTO Comments(content, articleId, userId, publishingDate) VALUES(?, ?, ?, ?)';
    let query = mysql.format(insertQuery, [newComment.commentContent, commentArticleId, commentUserId, newComment.commentPublishingDate]);

    return new Promise((resolve, reject) => {
        dataBase.query(query, (error, result) => {
            if(!error){
                resolve(result);
            }
        });
    });
};