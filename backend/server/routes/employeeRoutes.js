const rout = require('express').Router()
const multer = require('multer')
const projectController = require("../apis/project/projectController")
const employeeController = require('../apis/employee/employeeController')
const userController = require('../apis/user/userController')
const categoryController = require("../apis/category/categoryController")
const subcatController = require('../apis/subCategory/subcatController')
const teamController = require('../apis/projectTeam/teamController')
const taskController = require('../apis/task/taskController')
const submitController = require('../apis/submit/submitController')
const chatController = require('../apis/chat/chatController')
const coinsController = require('../apis/coins/coinsController')

//token middleware
rout.use(require('../middleware/tokenChecker'))


//change password
rout.post('/changepassword', userController.changePass)

//User
rout.post('/allusers', userController.allUsers)
rout.post('/singleuser', userController.singleUser)




//employee profile
const employeeStorage = multer.diskStorage({
    destination :(req, file, cb)=>{
        cb: (null, "server/public/employee")
    },
    filename : (req, file, cb)=>{
        cb : (null, Date.now + "-" + file.fieldname + "-" + file.originalname)
    }
})
const employeeUpdate = multer({storage: employeeStorage})

rout.post('/profile/update', employeeUpdate.single("picture"), employeeController.updateProfile)
rout.post('/all', employeeController.allEmployee)



//category
rout.post('/category/all', categoryController.allCategory)
rout.post('/category/single', categoryController.singleCategory)


//sub-category
rout.post('/subcategory/all', subcatController.allSubcat)
rout.post('/subcategory/single', subcatController.singleSubcat)


//project
rout.post('/project/all', projectController.allProjects)
rout.post('/project/single', projectController.singleProject)


//project teams
rout.post('/projectteam/all', teamController.allTeams)
rout.post('/projectteam/single', teamController.singleTeam)


//task 
rout.post('/task/all', taskController.allTask)
rout.post('/task/single', taskController.singleTask)
rout.post('/task/progress', taskController.taskProgress)


//work submittion
const submitStorage = multer.diskStorage({
    destination : (req, file ,cb)=>{
        cb(null, "server/public/submit")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+"-"+file.fieldname+"-"+file.originalname)
    }
})
const submitUploads = multer({storage: submitStorage})
 
rout.post('/work/submit', submitUploads.single('file'), submitController.upload)
rout.post('/work/update',submitUploads.single('file'), submitController.update)
rout.post('/work/all', submitController.allWork)

// coin
rout.post('/all/coins', coinsController.allCoins)

//chat 
rout.post('/chat/add', chatController.add)
rout.post('/chat/all', chatController.all)
rout.post('/chat/single', chatController.single)
rout.post('/chat/delete', chatController.delMessage)


rout.all('*', (req, res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})
module.exports = rout
