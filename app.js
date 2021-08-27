const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const app = express();
const userRoutes = require('./routes/user');

const sequelize = new Sequelize('eInteract', 'camour100', '-789hj:tfq&',{dialect: "mysql", host:"localhost"});
try{
    sequelize.authenticate();
    console.log("ok ! ");
}catch(error){
    console.log(error);
}
/*const dataBase = mysql.createConnection({
    'host': 'localhost',
    'user': 'camour100',
    'password': '-789hj:tfq&',
    'database': 'eInteract'    
});

dataBase.connect(function(err){
    if(err) throw err;
    console.log('database connexion succeed !');
});*/
// set CORS mecanism
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use('/api/auth', userRoutes);


module.exports = app;