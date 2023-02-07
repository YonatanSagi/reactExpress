const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const passport = require('passport');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();

// connect to db
mongoose.connect(`${process.env.DB_STRING}`);

//session config

app.use(session({
    secret: 'addo gay',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: `${process.env.DB_STRING}` }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


//passport
require('./server/configs/passport.config')
app.use(passport.initialize());
app.use(passport.session());
app.use('/', (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        const data = {}
        data.id = req.user.id
        data.email = req.user.email
        data.username = req.user.username
        next()
    }
    else
        next()
})

// routes requires
const loginRouter = require('./server/routes/login.js');
const registerRouter = require('./server/routes/signup');
const homeRouter = require('./server/routes/home');
const logOutRouter = require('./server/routes/logout');
const getUserRouter = require('./server/routes/getUser');



//routes calling
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/home', homeRouter);
app.use('/logout', logOutRouter);
app.use('/getuser',getUserRouter);


//start listning
app.use(express.static(__dirname + '/dist'));
app.listen(PORT);
console.log(`app is listening on port ${PORT}....`);
