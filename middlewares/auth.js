const jwt = require('jsonwebtoken');
let mysql = require('mysql2');
let dataBase = require('../mysql/config');

module.exports = (request, response, next) => {   
    try{
        const token = request.headers.authorization.split(' ')[1];
        // checks if the token signed part is valid based on the header and the payload data 
        //also contained in the token
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_KEY');
        if(request.body.userId && (request.body.userId != decodedToken.userId)){
            throw 'Invalid user !';
        }
        next();                  
    }catch(error){
        response.status(401).json({message: error | 'Unauthentificated request !'});
    }
};