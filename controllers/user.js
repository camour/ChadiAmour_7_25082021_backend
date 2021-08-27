//let dataBase = require('../model/mysql');

let mysql = require('mysql2');
let dataBase = mysql.createConnection({
    'host': 'localhost',
    'user': 'camour100',
    'password': '-789hj:tfq&',
    'database': 'eInteract'    
});

dataBase.connect(function(err){
    if(err) throw err;
    console.log('database connexion succeed !');
});

exports.signIn = (request, response, next) => {
    response.status(200).json({message: 'signed in !', post: {...request.body}});
};

exports.signUp = (request, response, next) => {
    let insertQuery = 'INSERT INTO User(email, userName, password, subscribingDate) VALUES(?,?,?,?)';
    let query = mysql.format(insertQuery, [request.body.email, request.body.email, request.body.password, new Date().toISOString().slice(0, 19).replace('T', ' ')]);
    dataBase.query(query);
    response.status(201).json({message: 'signed up !', post: {...request.body}});
};