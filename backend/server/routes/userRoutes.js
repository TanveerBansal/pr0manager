const rout = require('express').Router()
const userController = require("../apis/user/userController")

//login 
rout.post('/login', userController.login)



rout.all('*', (req, res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})


module.exports = rout