const jwt = require('jsonwebtoken')
const SECRET = "29834hdiusefh&%&^%#&^jshd8w94323J*#("

const check = (req, res, next)=>{
    let token = req.headers['authorization']

    if(!!token){
        jwt.verify(token,SECRET, (err, decoded)=>{
            if(err){
                res.send({success:false, status:403, message:"Unauthorised access"})
            }
            else{
                next()
            }
        } )
    }
    else{
        res.send({
            success:false,
            status:403,
            message:"No Token Found"
        })
    }
}

module.exports = check