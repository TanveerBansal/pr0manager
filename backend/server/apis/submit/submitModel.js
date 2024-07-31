const mongoose = require('mongoose')

const submitSchema = new mongoose.Schema({
    autoId : {type: Number, default: 0},
    taskId : {type: mongoose.Schema.Types.ObjectId, default: null, ref:'task'},
    file : {type: String, default: ""},
    createdAt: {type: Date , default: Date.now}
})

module.exports = mongoose.model('submit', submitSchema)