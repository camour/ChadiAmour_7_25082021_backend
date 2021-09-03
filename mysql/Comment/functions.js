let mysql = require('mysql2');
let dataBase = require('../config');

exports.updateComment = (commentId, commentUserId, comment) => {
    let updateQuery = 'UPDATE Comments SET content = ? WHERE id = ? AND articleId = ? AND userId = ?';
    let query = mysql.format(query, [comment.commentContent, commentId, comment.commentArticleId, commentUserId]);
    return new Promise((resolve, reject) => {
        dataBase.query(query, (error, result) => {
            if(!error){
                resolve(result);
            }
        });
    });
};

exports.deleteComment = (commentId, commentUserId, comment) => {
    let deleteQuery = 'DELETE FROM Comments WHERE id = ? AND articleId = AND userId = ';
    let query = mysql.format(deleteQuery, [commentId, comment.commentArticleId, commentUserId]);
    return new Promise((resolve, reject) => {
        dataBase.query(query, (error, result) => {
            if(!error){
                resolve(result);
            }
        })
    });
};

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