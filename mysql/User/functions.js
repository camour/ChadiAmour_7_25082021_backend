let mysql = require('mysql2');
let dataBase = require('../config');
const bcrypt = require('bcrypt');


exports.insertNewUser = (user, file) =>{
    let insertQuery = 'INSERT INTO User(email, userName, password, subscribingDate, image) Values( ?, ?, ?, ?, ?)'; 
    return bcrypt.hash(user.password, 10)
    .then(passwordHash => {
        let query = mysql.format(insertQuery, [user.email, user.userName, passwordHash, new Date().toISOString().slice(0, 19).replace('T', ' '), file]);
        return new Promise((resolve, reject) => {
            dataBase.query(query, (error, result) => {
                error? reject(error) : resolve(result);              
            });
        });        
    })  
};


exports.checkUser = (request, response, next) => {
    let selectQuery = 'SELECT id, userName, image, password FROM User WHERE userName = ?';

    let query = mysql.format(selectQuery, [request.body.userName]);
    
    return new Promise((resolve, reject) => {
        dataBase.query(query, (error, result) => {
            
            error ? reject(error) : resolve(result);
        });
    });
};