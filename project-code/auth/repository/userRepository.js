const UserModel = require('../models/userModel');
const { v4 : uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs');

//To get the profile of particular user

function GetUser(id){
    return new Promise((resolve,reject)=>{
        UserModel.find({_id:id},(err,user)=>{
            if(!err){
                resolve(user);
            }
            else{
                reject(user);
            }
        })
    })
}


// To add A new User in userbase

function AddUser(newUserInfo){
    return new Promise((resolve,reject)=>{
        UserModel.findOne({email:newUserInfo.email},(err,user)=>{
            if(user){
                resolve("User with specified email already exist");
            }
            else if(!user){
                newUser = new UserModel({
                    _id:uuidv4(),
                    firstName:newUserInfo.firstName,
                    lastName:newUserInfo.lastName,
                    gender:newUserInfo.gender,
                    email:newUserInfo.email,
                    password:bcrypt.hashSync(newUserInfo.password,10)
                });

                newUser.save((err)=>{
                    if(!err){
                        resolve('New User added successfully');
                    }
                    else{
                        reject(err);
                    }
                })
            }
            else{
                reject(err);
            }
        })
       

       
    })

}


// to update the information of user

function UpdateUserInfo(id,user){
    return new Promise((resolve,reject)=>{
       let newUser = new UserModel({
            firstName:user.firstName,
            lastName:user.lastName,
            gender:user.gender,
            email:user.email,
            password:(user.password)
        });
        User.findOneAndUpdate({_id: id}, newUser,(err,user)=>{
            if(!err){
                resolve(user);
            }
            else{
                reject(err);
            }
        });
  

    });
}

// to delete a user from userbase

function DeleteUser(userInfo){
return new Promise((resolve,reject)=>{
    UserModel.findOne({email:userInfo.email},(err,user)=>{
        if(!user){
           resolve("user does not exist")
        }
        else if(user){
            UserModel.deleteOne({email:userInfo.email},(err,data)=>{
                if(!err){
                    resolve("User Deleted Successfully");
                }
               
            })
        }
        else{
            reject(err);
        }
    })
   
})
}

module.exports = {GetUser,AddUser,DeleteUser,UpdateUserInfo};