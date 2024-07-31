const submit = require('./submitModel')


const upload = async (req, res) => {
    let validation = ""
    if (!req.body.taskId) {
        validation += "task _id is required"
    }
    if (!req.file) {
        validation += "file is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        let totalFiles = await submit.countDocuments()
        let obj = new submit()
        obj.autoId = totalFiles + 1
        obj.taskId = req.body.taskId
        obj.file = "submit/" + req.file.filename

        obj.save()
            .then((uploadedFile) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Submitted successfully",
                    data: uploadedFile
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


//update 
const update = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "submitted work's _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        submit.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Not found"
                    })
                }
                else {
                    if (!!req.body.taskId) {
                        result.taskId = req.body.taskId
                    }
                    if (!!req.file) {
                        result.file = "submit/" + req.file.filename
                    }
                    result.save()
                        .then((updated) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Updated Successfully",
                                data: updated
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


//findall submitted work
const allWork = (req,res)=>{
    submit.find(req.body)
    .populate({path:"taskId",populate:[{path:"projectId"},{path:"employeeId"}]}) //populate the objectids that in object id too
    .sort({createdAt: -1}).exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All submiited works are loaded",
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


//find single
const singleWork = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "submitted work _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation error: " + validation
        })
    }   
    else {
        submit.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Work does not exists"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Loaded",
                        data: result
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

module.exports = {upload, update, allWork, singleWork}