const coin = require('./coinsModel')
const Employee = require('../employee/employeeModel')

//add coin 
const addCoin = async (req,res)=>{
    let validation = ""
    if(!req.body.userId){
        validation += "userId is required "
    }
    if(!req.body.taskId){
        validation += "taskId is required "
    }
    if(!req.body.type){
        validation += "Type is required "
    }
    if(!req.body.coinCount){
        validation += "coinCount is required "
    }
    if(!req.body.message){
        validation += "Message is required "
    }
    if(!!validation){
        res.send({
            success : false,
            status : 400,
            message : "Validation Error: "+ validation
        })
    }
    else{
        let totalCoins = await coin.countDocuments()
        let obj = new coin()
        obj.autoId = totalCoins + 1
        obj.userId = req.body.userId
        obj.taskId = req.body.taskId
        obj.coinCount = req.body.coinCount
        obj.type = req.body.type
        obj.message = req.body.message

        obj.save()
        .then((result)=>{
            Employee.findOne({userId:req.body.userId}).exec()
            .then((employeeData)=>{
                if(employeeData == null){
                    res.send({
                        success : false,
                        status : 404,
                        message : "Employee Not Found"
                    })
                }
                else{
                    if(req.body.type == "add"){
                        employeeData.coins = employeeData.coins + Number(req.body.coinCount)
                    }
                    else{
                        employeeData.coins = employeeData.coins - Number(req.body.coinCount)
                    }
                    employeeData.save()
                    .then((savedEmployee)=>{
                        res.send({
                            success : true,
                            status : 200,
                            message : "Coin Count Changed"
                        })
                    })
                    .catch((err)=>{
                        res.send({
                            success : false,
                            status : 500,
                            message : err.message
                        })
                    })
                }
            })
            .catch((err)=>{
                res.send({
                    success : false,
                    status : 500,
                    message : err.message
                })
            })
        })
        .catch((err)=>{
            res.send({
                success : false,
                status : 500,
                message : err.message
            })
        })
    }
}

// all
const allCoins = (req,res)=>{
    coin.find(req.body).populate("taskId").populate("userId").sort({createdAt: -1}).exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All Coins History",
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

module.exports = {addCoin, allCoins}