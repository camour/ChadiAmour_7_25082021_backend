require('dotenv').config();

let mysql = require('mysql2');
let dataBase = mysql.createConnection({
    'host': process.env.DB_HOST,
    'user': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME  
});

dataBase.connect(function(err){
    if(err) throw err;
    console.log('database connexion succeed !');
});


module.exports = dataBase;