const express = require('express');
const session = require('express-session')
const path = require('path');
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const passport = require('passport');
require('dotenv').config
const PORT = process.env.PORT || 3000;
const app = express();

// connect to db
 mongoose.connect('mongodb://127.0.0.1:27017/test');

//session config

app.use(session({
    secret: 'addo gay',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:'mongodb://127.0.0.1:27017/test'}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


//passport
require('./server/configs/passport.config')
app.use(passport.initialize());
app.use(passport.session());
app.use('/',(req,res,next)=>{
    console.log(req.session);
    console.log(req.user);
    next()
})

// routes requires
const loginRouter = require('./server/routes/login.js');
const registerRouter = require('./server/routes/signup');
const homeRouter = require('./server/routes/home')



//routes calling
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/home',homeRouter)



//start listning
app.use(express.static(__dirname + '/dist'));
app.listen(PORT);
console.log('app is listening on port 3000....');
