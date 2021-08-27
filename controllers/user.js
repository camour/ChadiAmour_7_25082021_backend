

exports.signIn = (request, response, next) => {
    response.status(200).json({message: 'signed in !', post: {...request.body}});
};

exports.signUp = (request, response, next) => {

};