const subcat = require('./subcatModel')

const addSubcat = async (req, res) => {
    let validation = ""
    if (!req.body.name) {
        validation += "Name is Required  "
    }
    if (!req.body.categoryId) {
        validation += "categoryId is Required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    }
    else {
        let prevSubcat = await subcat.findOne({ name: req.body.name })
        if (prevSubcat == null) {
            let totalSubcat = await subcat.countDocuments()
            let obj = new subcat()
            obj.autoId = totalSubcat + 1
            obj.name = req.body.name
            obj.categoryId = req.body.categoryId

            obj.save()
                .then((result) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "New subcategory Added",
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
        else {
            res.send({
                success: false,
                status: 500,
                message: "Sub-category already exist"
            })
        }
    }
}

// find all sub-category
const allSubcat = (req, res) => {
    req.body.status = true
    subcat.find(req.body).populate('categoryId').sort({ createdAt: -1 }).exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All Sub-categories are loaded",
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

//find single sub-category
const singleSubcat = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation Error:" + validation
        })
    }
    else {
        subcat.findOne({ _id: req.body._id }).populate('categoryId').exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Sub-Category does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "single sub-category is loaded",
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

//update sub-category
const updateSubcat = async (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "sub-Category _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        let prevSubcat = await subcat.findOne({name: req.body.name
            // $and: [
            //     { name: req.body.name },
            //     { _id: { $ne: req.body._id } }
            // ]
        })
        if (prevSubcat == null) {
            subcat.findOne({ _id: req.body._id }).exec()
                .then((result) => {
                    if (result == null) {
                        res.send({
                            success: false,
                            status: 404,
                            message: "Sub-Category does not exist"
                        })
                    }
                    else {
                        if (!!req.body.name) {
                            result.name = req.body.name
                        }
                        if (!!req.body.categoryId) {
                            result.categoryId = req.body.categoryId
                        }
                        result.save()
                            .then((updatedSubcat) => {
                                res.send({
                                    success: true,
                                    status: 200,
                                    message: "Sub-Category updated",
                                    data: updatedSubcat
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
        else {
            res.send({
                success: false,
                status: 404,
                message: "Sub-category name already exist"
            })
        }

    }
}

//delete sub-category
const deleteSubcat = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "Sub-category _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error: " + validation
        })
    }
    else {
        subcat.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Sub-Category does not exist"
                    })
                }
                else {
                    result.status = false
                    result.save()
                        .then((deletedSubcat) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Sub-Category is deleted",
                                data: deletedSubcat
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
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message,
                })
            })
    }
}


module.exports = { addSubcat, allSubcat, singleSubcat, updateSubcat, deleteSubcat }