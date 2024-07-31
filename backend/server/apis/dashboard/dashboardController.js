const users = require('../user/userModel')
const projects = require('../project/projectModel')
const tasks = require('../task/taskModel')

const adminDashboard = async (req,res)=>{
    let totalUsers = await users.find({userType:2, status: true})
    let totalprojects = await projects.countDocuments()
    let totaltasks = await tasks.countDocuments()



    res.send({
        success : true,
        status : 200,
        message : " Admin Dash-board",
        totalUsers : totalUsers.length,
        totalprojects : totalprojects,
        totaltasks : totaltasks
    })
}


module.exports = {adminDashboard}