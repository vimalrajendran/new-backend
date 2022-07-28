const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "my secret key for authentication"

function PassportAuth(){
    return new LocalStrategy({ usernameField: 'email', passwordField: "password" },
    function (email, password, done) {
        UserModel.findOne({ email:email }, function (err, user) {
            if (err) { 
                console.log("Hi error");
                return done(err);
             }
            if (!user) { return done(null, false, { message: "Incorrect Email" }); }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false,{ message: "Incorrect Password" });
            }
            return done(null,user);
        });
    });
}


function GenerateToken(user){
   return jwt.sign(user,SECRET_KEY);
}


module.exports = {PassportAuth , GenerateToken}