let mysql = require('mysql2');
let dataBase = require('../config');

exports.selectArticles = () => {
    let selectQuery = 'SELECT Articles.id AS articleId, UPPER(Articles.subject) AS articleSubject, LOWER(Articles.content) AS articleContent, Articles.publishingDate AS articlePublishingDate, User.userName AS articleUserName, User.image AS articleUserImage FROM Articles INNER JOIN User ON Articles.userId = User.id ORDER BY Articles.publishingDate DESC';
    return new Promise((resolve, reject) => {
        dataBase.query(selectQuery, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    }); 
};

exports.selectComments = (articleId, commentsArray) => {
        let selectQuery = 'SELECT  Comments.id AS commentId, LOWER(Comments.content) AS commentContent, Comments.publishingDate AS commentPublishingDate, User.userName AS commentUserName FROM Comments INNER JOIN User ON Comments.userId = User.id WHERE Comments.articleId = ' + articleId + ' ORDER BY publishingDate DESC' ;
        return new Promise((resolve, reject) => {
            dataBase.query(selectQuery, (error, result) => {
                if(!error){
                    for(let index in result){
                        commentsArray.push({...result[index]});
                    }                    
                    resolve(commentsArray);
                }
                else{
                    reject(error);
                }
            });
        }); 
};

exports.updateArticle = (articleId, userId, articleSubject, articleContent) => {
    let updateQuery = 'UPDATE Articles SET subject = ?, content = ? WHERE id = ? AND userId = ?' ;
    let query = mysql.format(updateQuery, [articleSubject, articleContent, articleId, userId]);

    return new Promise((resolve, reject) => {
        dataBase.query(query, (error, result) => {
            resolve(result);
        })
    });
};

exports.deleteArticle = (articleId, userId) => {
    let deleteQuery = 'DELETE FROM Articles WHERE id = ? AND userId = ? ';
    let query = mysql.format(deleteQuery, [articleId, userId]);
    return new Promise((resolve, reject) => {
        dataBase.query(query, (error, result) => {
            resolve(result);
        })
    });
};

exports.deleteArticleComments = (articleId) => {
    let deleteQuery = 'DELETE FROM Comments WHERE articleId = ?';
    let query = mysql.format(deleteQuery, [articleId]);
    return new Promise((resolve, reject) => {
        dataBase.query(query, (error, result) => {
            resolve(result);
        })
    });
};

exports.insertNewArticle = (userId, newArticle) =>{
    let insertQuery = 'INSERT INTO Articles(subject, content, publishingDate, userId) VALUES(?, ?, ?, ?)';
    let query = mysql.format(insertQuery, [newArticle.articleSubject, newArticle.articleContent, newArticle.articlePublishingDate, userId]);
    return new Promise((resolve, reject) => {
        dataBase.query(query, (error, result) => {      
            if(!error){
                resolve(result);
            };
        });
    });
};
