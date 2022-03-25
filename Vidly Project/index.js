//modules:
const express = require('express');
const { func } = require('joi');
const Joi = require('joi');
const bodyparser = require('body-parser');
const genres = require('./routes/genres');
const home = require('./routes/home')
const morgan = require('morgan');
//-----------------------------
const app = express();

app.set('view engine' , 'pug');
app.set('views' , './views')

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(require('./midleware/logging'));
app.use(morgan('tiny'));
app.use(express.static('public')) //for static content 
app.use('/api/genres' , genres);
app.use('/' , home);
// ------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port , console.log(`Listening on port ${port}`));

