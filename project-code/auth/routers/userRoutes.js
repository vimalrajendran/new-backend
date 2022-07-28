const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const router = express.Router();
const { GetProfile, RegisterUser,LoginUser, UnregisterUser, UpdateAuthInfo} = require('../controllers/UserControllers');


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
}

router.get('/profile/:id',GetProfile);
router.post('/register',RegisterUser);
router.post('/login',passport.authenticate('local'),LoginUser);
router.put('/updateprofile/:id', UpdateAuthInfo);


module.exports = router