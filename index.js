const express = require('express');
const app = express();

const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const  api = require('./routes/api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
require('dotenv').config()




app.use('/',api);


app.listen(port,()=>{
    console.log("Listening on port "+port);
});

module.exports = app;