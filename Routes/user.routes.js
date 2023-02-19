const express= require("express")
const { userModel } = require("../Models/user.model")

const userRouter= express.Router()
const bcrypt= require('bcrypt')
const jwt= require("jsonwebtoken")
//! registration method

userRouter.post("/register",async(req,res)=>{

    const {name,email,password}= req.body
    try{
        bcrypt.hash(password, 5,async (err, hash)=> {
            // Store hash in your password DB.
            if(err) console.log(err.message)
            else{
                const newUser= new userModel({name,email,password:hash})
                await newUser.save()
                res.send("user has been registered")
            }
        });

    }
    catch{
        res.send("can not register the user")
    }
    
})


//! login method

userRouter.post("/login",async(req,res)=>{

    const {email,password}= req.body

    try{
        const user= await userModel.find({email})
       
        const hashedPassword= user[0].password
        bcrypt.compare(password, hashedPassword, (err, result)=> {
            // result == true
            if(err){
                console.log(err)
                res.send("please enter valid credential")
            }
            else if(result){
                let token= jwt.sign({userID:user[0]._id},"masai")
                res.send({"msg":"logged in successfully","token":token})
            }
            else    res.send("please enter valid credential")
        });
    }
    catch{
res.send("can not login")
    }
})

//!exports

module.exports={
    userRouter
}

