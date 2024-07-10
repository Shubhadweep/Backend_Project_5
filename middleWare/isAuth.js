const jwt = require('jsonwebtoken');

class AuthJwt{
    async authJwt(req,res,next){
        try{
            console.log("middleware",req.cookies.token_Data);
            if(req.cookies && req.cookies.token_Data){
                jwt.verify(req.cookies.token_Data,process.env.SECRET_KEY,(err,data)=>{
                    console.log("verify Token data: ",data);
                    req.user = data
                    next();
                })
            }else{
                next();
            }

        }catch(error){
            console.log("Error to verify token: ",error);
        }
    }
}

module.exports = new AuthJwt();