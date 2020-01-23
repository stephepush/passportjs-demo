const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const pg = require('pg');
const errorHandler = require('errorhandler');

//Configure is Production variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate app
const app = express();

//Configure app
app.use(cors());
app.use(require('morgan')("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
    { 
        secret: 'passport-tutorial', 
        cookie: { maxAge: 60000}, 
        resave: false, saveUninitialized: false
    }
));

if(!isProduction){
    app.use(errorHandler());
}

//Configure Mongoose
//mongoose.connect('mongodb://localhost/passport-tutoria');
//mongoose.set('debug', true);

//Error handlers and middlewares
if(!isProduction) {
    app.use((err, req, res) =>{
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            }
        })
    })
}

app.use((err,req,res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {},
        }
    })
})

app.listen(8000, () => console.log('Server running on http://localhost: 8000/'));