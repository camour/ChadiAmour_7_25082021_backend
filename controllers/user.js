//let dataBase = require('../model/mysql');
let functions = require('../mysql/User/functions');


exports.signIn = (request, response, next) => {
    functions.checkUser(request, response, next)
    .then(result => {
        console.log(result);
        response.status(201).json({message: 'signed in !', post: {...request.body}});
    })
    .catch(error => {
        console.log(error);
        response.status(401).json({message: 'invalid user or password'});
    });
    
    
};

exports.signUp = (request, response, next) => {
    
        functions.insert(request, response, next)
        .then(result => {            
            response.status(201).json({message: 'ressource created !'});
        })
        .catch(error => {   
            //const message = error.no == 1062 ? 'user already existing'  
            response.status(400).json({message: 'failed to create ressource'});
        });    
};