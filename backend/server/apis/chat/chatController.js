const chatModel = require('./chatModel')
// Add chat Api Validations
const add = async (req, res) => {
    let validation = ""
    if (!req.body.firstUserId) {
        validation += "firstUserId is Required "
    }
    if (!req.body.secondUserId) {
        validation += "secondUserId is Required "
    }
    if (!req.body.message) {
        validation += "message are Required "
    }
    if (!req.body.fromId) {
        validation += "fromId are Required "
    }
    if (!!validation) {
        return res.json({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        let prevChat = await chatModel.find({
            $or: [
                {
                    $and: [
                        { firstUserId: req.body.firstUserId },
                        { secondUserId: req.body.secondUserId },
                    ]
                },
                {
                    $and: [
                        { firstUserId: req.body.secondUserId },
                        { secondUserId: req.body.firstUserId },
                    ]
                }
            ]
        })
        if (prevChat.length == 0) {
            let total = await chatModel.countDocuments()
            let newChat = new chatModel()
            newChat.autoId = total + 1
            newChat.firstUserId = req.body.firstUserId
            newChat.secondUserId = req.body.secondUserId
            let newMessage = {
                fromId: req.body.fromId,
                message: req.body.message
            }
            newChat.messages = [newMessage]

            newChat.save()
                .then((result) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "New Chat begins",
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
            let messageArray = []

            messageArray = prevChat[0].messages
            let newMessage = {
                fromId: req.body.fromId,
                message: req.body.message
            }
            messageArray.push(newMessage)
            prevChat[0].messages = messageArray
            prevChat[0].save()
                .then((result) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Chat Updated",
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
}

// Find function for view All chat
const all = (req, res) => {
    let validation = ""
    if (!req.body.userId) {
        validation += "userId is required"
    }
    if (!!validation) {
        return res.json({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        chatModel.find({
            $or: [
                { firstUserId: req.body.userId },
                { secondUserId: req.body.userId }
            ]
        }).exec()
            .then((result) => {
                res.json({
                    success: true,
                    status: 200,
                    message: "All chat Loaded",
                    total: result.length,
                    data: result
                })
            })
            .catch((err) => {
                res.json({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }

}
// validations for view Single by _id
const single = (req, res) => {
    let validation = ""
    if (!req.body.fromId) {
        validation = "fromId is required"
    }
    if (!req.body.toId) {
        validation = "toId is required"
    }

    if (!!validation) {
        return res.json({
            success: false,
            status: 400,
            message: "Validation Error " + validation
        })
    }
    else {
        chatModel.find({
            $or: [
                {
                    $and: [
                        { firstUserId: req.body.fromId },
                        { secondUserId: req.body.toId }
                    ]
                },
                {
                    $and: [
                        { firstUserId: req.body.toId },
                        { secondUserId: req.body.fromId }
                    ]
                }
            ]
        }).exec()
            .then((result) => {
                if (result.length == 0) { // null id validation 
                    return res.json({
                        success: false,
                        status: 404,
                        message: "chat dose not exist"
                    })
                }
                else {
                    result[0].messages = result[0].messages.filter((x) => { return x.status == true })
                    res.json({
                        success: true,
                        status: 200,
                        message: "single chat response",
                        data: result[0]
                    })
                }
            })
            .catch((err) => {
                res.json({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}
// Delete msg Api
const delMessage = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }
    if (!req.body.index) {
        validation += "index is required"
    }

    if (!!validation) {
        return res.json({
            success: false,
            status: 400,
            message: "Validation Error " + validation
        })
    }
    else {
        chatModel.findOne({ _id: req.body._id }).exec()
            .then((chatData) => {
                if (chatData == null) {
                    return res.json({
                        success: false,
                        status: 400,
                        message: "Chat Does not exist"
                    })
                }
                else {
                    let messageArray = chatData.messages
                    messageArray[Number(req.body.index)].status = false

                    chatData.messages = messageArray
                    chatData.save()
                        .then((updatedData) => {
                            return res.json({
                                success: true,
                                status: 200,
                                message: "Message Deleted",
                                data: updatedData
                            })
                        })
                        .catch((err) => {
                            res.json({
                                success: false,
                                status: 500,
                                message: err.message
                            })
                        })
                }
            })
            .catch((err) => {
                res.json({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}

module.exports = { add, all, single, delMessage }