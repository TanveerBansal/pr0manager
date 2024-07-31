const userModel = require('../user/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { rawListeners } = require('../project/projectModel')
const SECRET = "29834hdiusefh&%&^%#&^jshd8w94323J*#("

//user login
const login = (req, res) => {
    let validation = ""
    if (!req.body.email) {
        validation += "Email is required "
    }
    if (!req.body.password) {
        validation += "Password is required "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    }
    else {
        userModel.findOne({ email: req.body.email }).exec()
            .then((userData) => {
                if (userData == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Account Does not exist"
                    })
                }
                else {
                    if (bcrypt.compareSync(req.body.password, userData.password)) {
                        if (userData.status) {
                            let payload = {
                                _id:userData._id,
                                name:userData.name,
                                email:userData.email,
                                userType: userData.userType
                            }
                            let token = jwt.sign(payload, SECRET, {expiresIn:'5h'})
                            res.send({
                                success: true,
                                status: 200,
                                message: "LoggedIn Successfully",
                                data: userData,
                                token:token
                            })
                        }
                        else {
                            res.send({
                                success: false,
                                status: 400,
                                message: "Account InActive, Contact Admin"
                            })
                        }
                    }
                    else {
                        res.send({
                            success: false,
                            status: 400,
                            message: "Invalid Credentials"
                        })
                    }
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}


//change password of user
const changePass = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "User _id is required "
    }
    if (!req.body.currentpassword) {
        validation += "current password is required "
    }
    if (!req.body.newpassword) {
        validation += "new password is required "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        userModel.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Account does not exist"
                    })
                }
                else {
                    if (bcrypt.compareSync(req.body.currentpassword, result.password)) {

                        if (bcrypt.compareSync( req.body.newpassword,result.password)) {
                            res.send({
                                success: false,
                                status: 400,
                                message: "New Password can not be same as current password"
                            })
                        }
                        else {
                            result.password = bcrypt.hashSync(req.body.newpassword, 10)
                            result.save()
                                .then((updatedData) => {
                                    res.send({
                                        success: true,
                                        status: 200,
                                        message: "Password changed successfully",
                                        data: updatedData
                                    })
                                })
                                .catch((err) => {
                                    res.send({
                                        success: false,
                                        status: 500,
                                        message: err.message
                                    })
                                })
                        }
                    }
                    else {
                        res.send({
                            success: false,
                            status: 400,
                            message: "invalid password"
                        })
                    }
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}


//change status of user(block or unblock)
const changeStatus = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "user_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        userModel.findOne({ _id: req.body._id }).exec()
            .then((userData) => {
                if (userData == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Account Does Not Exist"
                    })
                }
                else {
                    if (!!req.body.status) {
                        userData.status = req.body.status
                    }
                    userData.save()
                        .then((updatedStatus) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Status Updated",
                                data: updatedStatus
                            })
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message
                            })
                        })
                }

            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}

//all users
const allUsers = (req, res) => {
    userModel.find(req.body).exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All users",
                data: result
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
}

// single user
const singleUser = (req,res)=>{
    let validation = ""
    if(!req.body._id){
        validation += "_id is required"
    }
    if(!!validation){
        res.send({
            success : false,
            status : 400,
            message :  validation
        })
    }
    else{
        userModel.findOne({_id : req.body._id}).exec()
        .then((result)=>{
            if(result == null){
                res.send({
                    success : false,
                    status : 404,
                    message : "User does not exist"
                })
            }
            else(
                res.send({
                    success : true,
                    status : 200,
                    message : "User Detail loaded",
                    data : result
                })
            )
        })
        .catch((err)=>{
            res.send({
                success : false ,
                status : 500,
                message : err.message
            })
        })
    }
    
}

module.exports = { login, changePass, changeStatus, allUsers, singleUser }