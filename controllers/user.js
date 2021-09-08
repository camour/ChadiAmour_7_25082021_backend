let functions = require('../mysql/User/functions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const base64 = require('base-64');
const utf8 = require('utf8');


exports.signIn = (request, response, next) => {
    functions.checkUser(request, response, next)
    .then(result => {
        // We use bcrypt to compare password submit by user and the password in database
        bcrypt.compare(request.body.password, result[0].password)
        .then(valid => {
                //if comparison is ok, we send create a token that we send to the client and some
                // additionnal user's informations
                if(valid){
                    response.status(200).json({
                        user: {
                            userId: result[0].id,
                            userName: result[0].userName,
                            image: result[0].image
                        },
                        token: jwt.sign({userId: result[0].id}, process.env.TOKEN_SECRET_KEY, {expiresIn: '24h'}) 
                    });                
                }else{
                    // we dont give a clear response in case of the client is a hacker
                    response.status(401).json({message: 'Invalid user or password'});
                }
        })
        .catch(error => {
            response.status(500).json({error});
        });       
    })
    .catch(error => {
         // we dont give a clear response in case of the client is a hacker
        response.status(401).json({message: 'invalid user or password'});
    });
    
    
};

exports.signUp = (request, response, next) => {
    if(request.file){
        functions.insertNewUser({email: request.body.email, userName: request.body.userName, password: request.body.password},
            `${request.protocol}://${request.get('host')}/images/${request.file.filename}`)
        .then(result => {            
            response.status(201).json({message: 'ressource created !'});
        })
        .catch(error => {   
            response.status(400).json({message: 'failed to create ressource : try with another account'});
        });
    }else{
        response.status(400).json({message: 'profile image is required'});
    }

};

exports.user = (request, response, next) => {
    functions.selectUser(request.params.userId)
    .then(result => {
        response.status(200).json({user: {
            email: result[0].email,
            subscribingDate: result[0].subscribingDate,
            postsNumber: result[0].postsNumber            
        }});
    })
    .catch(error => {
        response.status(400).json(error);
    })
};

exports.deleteUser = (request, response, next) => {
    functions.deleteUser(request.params.userId)
    .then(() => {
        response.status(200).json({message: 'ressource deleted !'});
    })
    .catch();
};