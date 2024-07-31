const project = require('./projectModel')

const addProject = async (req, res) => {
    let validation = ""
    if (!req.body.name) {
        validation += "Name is required "
    }
    if (!req.body.description) {
        validation += "Description is required "
    }
    if (!req.body.client) {
        validation += "Client name is required "
    }
    if (!req.body.technology) {
        validation += "Technology  is required "
    }
    if (!req.file) {
        validation += "Attachment  is required "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        let total = await project.countDocuments()
        let obj = new project()
        obj.autoId = total + 1
        obj.name = req.body.name
        obj.description = req.body.description
        obj.attachment = "project/"+req.file.filename
        obj.client = req.body.client
        obj.technology = req.body.technology

        obj.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New Project Added",
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
}

//find function for all project

const allProjects = (req, res) => {
    req.body.status = true
    project.find(req.body).sort({createdAt: -1}).exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All Projects Are Loaded",
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

//find single project using _id
const singleProject = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "project _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation Error : " + validation
        })
    }
    else {
        project.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "project does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Project Loaded",
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

//update project
const updateProject = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "project _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation Error: " + validation
        })
    }
    else {
        project.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Project does not exist"
                    })
                }
                else {
                    if (!!req.body.name) {
                        result.name = req.body.name
                    }
                    if (!!req.body.description) {
                        result.description = req.body.description
                    }
                    if (!!req.file) {
                        result.attachment = "project/" + req.file.filename
                    }
                    if (!!req.body.client) {
                        result.client = req.body.client
                    }
                    if (!!req.body.technology) {
                        result.technology = req.body.technology
                    }
                    result.save()
                        .then((updatedProject) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Project Updated",
                                data: updatedProject
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

//delete project
const deleteProject = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation error: " + validation
        })
    }
    else {
        project.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Project does not exist"
                    })
                }
                else {
                    result.status = false
                    result.save()
                        .then((deletedProject) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Project Is Deleted",
                                data: deletedProject
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

module.exports = { addProject, allProjects, singleProject, updateProject, deleteProject }