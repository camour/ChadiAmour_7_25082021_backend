let functions = require('../mysql/Comment/functions');


exports.modifyComment = (request, response, next) => {
    functions.updateComment(request.params.commentId, request.body.userId, request.body.comment)
    .then(result => {
        response.status(200).json({message: 'ressource modified !'});
    })
    .catch();
};

exports.deleteComment = (request, response, next) => {
    functions.deleteComment(request.params.commentId, request.body.userId, request.body.comment)
    .then(result => {
        response.status(200).json({message: 'ressource deleted !'});
    })
    .catch();
};

exports.createComment = (request, response, next) => {
    functions.insertNewComment(request.params.articleId, request.body.userId, request.body.newCommentToAdd)
    .then(result => {
        response.status(200).json({commentId: result.insertId, message: 'ressource created !'});
    })
    .catch(error => {
        response.status(400).json({message: 'cannot create ressource !'});
    });
};