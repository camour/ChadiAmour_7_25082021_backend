const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');
const path = require('path');
const helmet = require('helmet');


//sets HSTS (Http Strict Transport Security) attribute : 
// it prevents API from XSS, cookies from being accessed by any scripts and finally sets https connexions
app.use(helmet());

// set CORS mecanism
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;