let mysql = require('mysql2');
let dataBase = require('../config');



exports.insertNewUser = (request, response, next) =>{
    let insertQuery = 'INSERT INTO User(email, userName, password, subscribingDate) Values( ?, ?, ?, ?)';    
    let query = mysql.format(insertQuery, [request.body.email, 
        request.body.userName, 
        request.body.password, 
        new Date().toISOString().slice(0, 19).replace('T', ' ')]
        );    
    return new Promise((resolve, reject) => {
        dataBase.query(query, (error, result) => {
            error? reject(error) : resolve(result);              
        });
    });  
    
};


exports.checkUser = (request, response, next) => {
    let selectQuery = 'SELECT id, userName, password FROM User WHERE userName = ? AND password = ?';
    let query = mysql.format(selectQuery, [request.body.userName, request.body.password]);
    
    return new Promise((resolve, reject) => {
        dataBase.query(query, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
};

exports