let mysql = require('mysql2');
let dataBase = require('../config');




exports.insert = (request, response, next) =>{
    let insertQuery = 'INSERT INTO User(email, userName, password, subscribingDate) Values( ?, ?, ?, ?)';    
    let query = mysql.format(insertQuery, [request.body.email, 
        request.body.email, 
        request.body.password, 
        new Date().toISOString().slice(0, 19).replace('T', ' ')]
        );
    return dataBase.query(query);
};