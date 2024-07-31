const category = require('./categoryModel')

const addCategory = async (req, res) => {
    let validation = ""
    if (!req.body.name) {
        validation += "Name is Required  "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    }
    else {
        let prevCategory = await category.findOne({ name: req.body.name })
        if (prevCategory == null) {
            let total = await category.countDocuments()
            let obj = new category()
            obj.autoId = total + 1
            obj.name = req.body.name

            obj.save()
                .then((result) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "New Category Added",
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
                status: 404,
                message: "Category name already exist"
            })
        }

    }


}

// find all category
const allCategory = (req, res) => {
    req.body.status = true
    category.find(req.body).sort({ createdAt: -1 }).exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All categories are loaded",
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

//find single category
const singleCategory = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += " Category _id is required "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    }
    else {
        category.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Category does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single category loaded",
                        data: result
                    })
                }
            })
            .catch((err) => {
                res.semd({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}

//update category
const updateCategory = async(req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "Category _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    }
    else {
        let prevCategory = await category.findOne({name: req.body.name})
        if(prevCategory == null){
            category.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Category does not exist"
                    })
                }
                else {
                    if (!!req.body.name) {
                        result.name = req.body.name
                    }
                    result.save()
                        .then((updatedCategory) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Category updated",
                                data: updatedCategory
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
                success: false,
                status: 404,
                message: "Category name already exist"
            })
        }
    }
}

//delete category
const deleteCategory = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "category _id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    }
    else {
        category.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "Category does not exist"
                    })
                }
                else {
                    result.status = false
                    result.save()
                        .then((deletedCategory) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Category is deleted",
                                data: deletedCategory
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

module.exports = { addCategory, allCategory, singleCategory, updateCategory, deleteCategory } 