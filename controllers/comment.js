let functions = require('../mysql/Comment/functions');


exports.createComment = (request, response, next) => {
    functions.insertNewComment(request.params.articleId, request.body.userId, request.body.newCommentToAdd)
    .then(result => {
        response.status(200).json({commentId: result.insertId, message: 'ressource created !'});
    })
    .catch(error => {
        response.status(400).json({message: 'cannot create ressource !'});
    });
};