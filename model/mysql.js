/*var Sequelize = require('sequelize');

var sequelize = new Sequelize('eInteract', 'camour100', '-789hj:tfq&',{dialect: "mysql", host:"localhost", logging: true});

var exports = module.exports = {};
exports.sequelize = sequelize;*/

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

module.exports = dataBase;