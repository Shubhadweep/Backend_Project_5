const bcrypt = require('bcryptjs');
const autherizationModel = require('../Model/authModel');
const jwt = require('jsonwebtoken');


const getSignup = (req,res)=>{
    res.render('Authorization/registration',{
        title:'Signup Page',
        path : '/signup'
    })
}

const getlogin = (req,res)=>{
    res.render('Authorization/login',{
        title:'Login page',
        path: '/login'
    })
}

const postSignup = async(req,res)=>{
    try{
        console.log("The user Details Collected from the form: ", req.body);

        let existMail = await autherizationModel.findOne({userName:req.body.email});
        if(existMail){
            console.log("SomeOne has already registered with this mail Id ", existMail);
            res.redirect("/signup")
        }else{

            let hashPassword = await bcrypt.hash(req.body.password,12);
            console.log("The Generated hash Password is: ",hashPassword);

            let formData = new autherizationModel({
                userName: req.body.email,
                password: hashPassword
            });
    
            let saveData = await formData.save();
            if(saveData){
                res.redirect("/login");
            }

        }

    }catch(error){
        console.log("Failed to save Data into the database ", error);
    }
}

const postLogin = async(req,res)=>{
    try{
        console.log("The login Details Collected from the form: ",req.body);
        let existMail = await autherizationModel.findOne({userName:req.body.email});
        if(!existMail){
            console.log("Incorrect Email-Id ");
            res.redirect("/login");
        }else{
            let comparePassword = await bcrypt.compare(req.body.password,existMail.password);
            if(comparePassword){
                let token_payload = {userData: existMail};
                const token_jwt = jwt.sign(token_payload,process.env.SECRET_KEY,{
                    expiresIn: '1h',
                });
                res.cookie("token_Data",token_jwt,{
                    expires: new Date(Date.now() + 3600000),
                    httpOnly:true,
                })
                console.log("Login Successfull");
                return res.redirect("/Dashboard");
            }else{
                console.log("Wrong Password");
                res.redirect("/login");
            }
        }

    }catch(error){
        console.log("Failed to Login ",error);
    }
}

const dashBoard = async(req,res)=>{
    let user_Data = req.user.userData;
    console.log("The user Details got from the Token: ",user_Data);
    res.render("Authorization/dashBoard",{
        title:'Profile page',
        path:"/Dashboard",
        info : user_Data
    })
}

const userAuth = async(req,res,next)=>{
    try{
        console.log("User Details: ",req.user);
        if(req.user){
            next();
        }else{
            console.log("You need to login first");
            res.redirect("/login");
        }

    }catch(error){
         throw error;
    }

}
module.exports = {
    getSignup,getlogin,postSignup,postLogin, dashBoard, userAuth
}