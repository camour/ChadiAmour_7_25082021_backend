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
                            userName: result[0].userName,
                            image: result[0].image
                        },
                        token: jwt.sign({userId: result[0].id}, 'RANDOM_SECRET_KEY', {expiresIn: '24h'}) 
                    });                
                }else{
                    response.status(401).json({message: 'Invalid user or password'});
                }
        })
        .catch(error => {
            response.status(500).json({error});
        });       
    })
    .catch(error => {
        console.log(error);
        response.status(401).json({message: 'invalid user or password'});
    });
    
    
};

exports.signUp = (request, response, next) => {
    functions.insertNewUser({email: request.body.email, userName: request.body.userName, password: request.body.password},
        `${request.protocol}://${request.get('host')}/images/${request.file.filename}`)
    .then(result => {            
        response.status(201).json({message: 'ressource created !'});
    })
    .catch(error => {   
        response.status(400).json({message: 'failed to create ressource : try with another account'});
    });
};

exports.user = (request, response, next) => {
    functions.selectUser(request.params.userId)
    .then(result => {
        response.status(200).json({user: {
            email: result[0].email,
            subscribingDate: result[0].subscribingDate
        }});
    })
    .catch(error => {
        response.status(400).json(error);
    })
};