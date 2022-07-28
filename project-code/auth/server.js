const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoDBStore = require('connect-mongodb-session')(session);

const UserModel = require('./models/userModel');
const {PassportAuth} = require('./userauth/userAuth')
const userRoutes = require('./routers/userRoutes')

const port = 7000;
const app = express();

//body-parser middleware
app.use(cors({origin: true, credentials: true, }));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
//create mongoDB store to store session
let store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/AuthenticationDB',
    collection: 'uesrSessions'
});

// session middleware
app.use(session({
    secret: 'this is my secret key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000
    },
    store: store
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
})
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    })
})



// use passport local strategy
passport.use(PassportAuth());


app.use('/api/auth', userRoutes);

//to connect your express app to mongodb
mongoose.connect('mongodb://localhost:27017/AuthenticationDB');
mongoose.connection.once('open', () => {
    console.log('Connected to server');
}).on('error', (err) => {
    console.log(err);
});



app.listen(port, (err) => {
    if (err) {
        console.log('Error ' + err);
        return;
    }
    console.log("server is up and running on port " + port);
})