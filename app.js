const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');
const path = require('path');
const helmet = require('helmet');


//sets HSTS (Http Strict Transport Security) attribute : 
// it prevents website from XSS, cookies from being accessed by any scripts
app.use(helmet());

// set CORS mecanism
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// transforms JSON into JS object that we can use
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;