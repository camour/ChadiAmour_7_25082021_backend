//let dataBase = require('../model/mysql');
let functions = require('../mysql/User/functions');


exports.signIn = (request, response, next) => {

    response.status(201).json({message: 'signed up !', post: {...request.body}});
    
};

exports.signUp = (request, response, next) => {
    
    try{
        let result = functions.insert(request, response, next);
        //console.log(result);
        response.status(201).json({message: 'ressource created !'});
    }catch(error){
        console.log(error);
        response.status(500).json({message: 'failed to create ressource'});
    }
    
};