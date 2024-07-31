// const userModel = require('../user/userModel')
const user = require('../user/userModel')
const employee = require('./employeeModel')
const bcrypt = require('bcrypt')
const fs = require('fs')

const register = async (req, res) => {
    let validation = ""
    if (!req.body.name) {
        validation += "name is required "
    }
    if (!req.body.email) {
        validation += "email is required "
    }
    if (!req.body.password) {
        validation += "password is required "
    }
    if (!req.body.contact) {
        validation += "contact is required "
    }
    if (!req.file) {
        validation += "picture is required "
    }
    if (!req.body.experience) {
        validation += "experience is required "
    }
    if (!req.body.jobtitle) {
        validation += "jobtitle is required "
    }
    if (!req.body.joiningdate) {
        validation += "joiningdate is required "
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        let prevuser = await user.findOne(
            { email: req.body.email }
        )
        if (prevuser == null) {
            let totalUsers = await user.countDocuments()
            let obj = new user()
            obj.autoId = totalUsers + 1
            obj.name = req.body.name
            obj.email = req.body.email
            obj.password = bcrypt.hashSync(req.body.password, 10)
            obj.save()
                .then(async (savedUser) => {
                    let totalEmployees = await employee.countDocuments()
                    let obj1 = new employee()
                    obj1.autoId = totalEmployees + 1
                    obj1.name = req.body.name
                    obj1.email = req.body.email
                    obj1.contact = req.body.contact
                    obj1.picture = "employee/"+req.file.filename
                    obj1.experience = req.body.experience
                    obj1.jobtitle = req.body.jobtitle
                    obj1.joiningdate = req.body.joiningdate
                    obj1.userId = savedUser._id

                    obj1.save()
                        .then((savedEmployee) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "New Employee Account Created ",
                                data: savedEmployee
                            })
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message,
                            })
                        })
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        status: 500,
                        message: err.message,
                    })
                })
        }
        else {
            res.send({
                success: false,
                status: 400,
                message: "Email already exist"
            })
        }
    }
}

//update data in both collection
const updateProfile = async(req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "user _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        let prevUser = await user.findOne({email: req.body.email})
        if (prevUser == null){
            user.findOne({ _id: req.body._id }).exec()
            .then((userData) => {
                if (userData == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "User Account does not exist"
                    })
                }
                else {
                    if (!!req.body.name) {
                        userData.name = req.body.name
                    }
                    if (!!req.body.email) {
                        userData.email = req.body.email
                    }
                    userData.save()
                        .then((updatedUser) => {
                            employee.findOne({ userId: req.body._id }).exec()
                                .then((employeeData) => {
                                    if (employeeData == null) {
                                        res.send({
                                            success: false,
                                            status: 404,
                                            message: "Employee Account Does Not Exist"
                                        })
                                    }
                                    else {
                                        if (!!req.body.name) {
                                            employeeData.name = req.body.name
                                        }
                                        if (!!req.body.email) {
                                            employeeData.email = req.body.email
                                        }
                                        if (!!req.body.contact) {
                                            employeeData.contact = req.body.contact
                                        }
                                        if (!!req.file) {
                                            employeeData.picture = "employee/"+req.file.filename
                                        }
                                        if (!!req.body.experience) {
                                            employeeData.experience = req.body.experience
                                        }
                                        if (!!req.body.jobtitle) {
                                            employeeData.jobtitle = req.body.jobtitle
                                        }

                                        employeeData.save()
                                            .then((updatedEmployee) => {
                                                res.send({
                                                    success: true,
                                                    status: 200,
                                                    message: "Account Updated",
                                                    data: updatedEmployee
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
        else{
            res.send({
                success : false,
                status: 400,
                message : "Email already exist"
            })
        }
    }
}


//view all employee
const allEmployee = (req, res) => {
    // req.body.status = true 
    employee.find(req.body).populate("userId").sort({ autoId: -1 }).exec()
        .then((allEmp) => {
            res.send({
                success: true,
                status: 200,
                message: "All Employees List",
                data: allEmp
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


//find single employee
const singleEmployee = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "emplouee_id is requied"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        employee.findOne({ _id: req.body._id }).exec()
            .then((employeeData) => {
                if (employeeData == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Account does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Account Loaded",
                        data: employeeData
                    })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    data: err.message
                })
            })
    }
}


module.exports = { register, updateProfile, allEmployee, singleEmployee }
