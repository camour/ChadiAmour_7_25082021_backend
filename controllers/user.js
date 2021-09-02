let functions = require('../mysql/User/functions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signIn = (request, response, next) => {
    functions.checkUser(request, response, next)
    .then(result => {
        bcrypt.compare(request.body.password, result[0].password)
        .then(valid => {
                if(valid){
                    response.status(200).json({
                        user: {
                            userId: result[0].id,
                            userName: result[0].userName
                        },
                        token: jwt.sign({userId: result[0].id}, 'RANDOM_SECRET_KEY', {expiresIn: '24h'}) 
                });
            }
        });       
    })
    .catch(error => {
        console.log(error);
        response.status(401).json({message: 'invalid user or password'});
    });
    
    
};

exports.signUp = (request, response, next) => {
    
    functions.insertNewUser(request, response, next)
    .then(result => {            
        response.status(201).json({message: 'ressource created !'});
    })
    .catch(error => {   
        response.status(400).json({message: 'failed to create ressource : try with another account'});
    });    
};