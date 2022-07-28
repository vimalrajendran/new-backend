
const {GetUser,AddUser, DeleteUser,UpdateUserInfo} = require('../repository/userRepository');
const {GenerateToken} = require('../userauth/userAuth');
const users = require('../models/userModel');


//Get Profile of a particular user

function GetProfile(req,res){
    GetUser(req.params.id).then(user=>{
        res.status(200).send(user);
    })
}

//register a user

function RegisterUser(req,res){
   AddUser(req.body).then(user=>{
     res.status(201).send(user);
   })
}

// give access to authentcate user

// function LoginUser(req,res){
//     res.status(200).send({ msg:"logged in successfully"})
//     console.log("logged in");
// }

function LoginUser(req,res){
    const email=req.body.email
    users.findOne({email:email},(error,user)=>{
        console.log(user);
        const token = GenerateToken(user.id);
        const firstname = user.firstName;
		const lastname = user.lastName;
        console.log(firstname,lastname);
        console.log(token);
        // res.cookie("cookie",token,({httpOnly:false}));
        res.status(200).send({firstname, lastname, token, msg:"logged in successfully"})
    })
    
    console.log("logged in");
}

// to unregister a user from userbase
function UnregisterUser(req,res){
    DeleteUser(req.body).then( user=>{
        res.status(200).send(user);
    });
}

// to update User info

function UpdateAuthInfo(req,res){
    UpdateUserInfo(req.params.id,req.body).then(user=>{
        res.status(200).send(user);
    });

}


module.exports = {GetProfile, RegisterUser,LoginUser , UnregisterUser,UpdateAuthInfo};