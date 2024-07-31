const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    autoId: { type: Number, default: 0 },
    projectId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'project' },
    employeeId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'subcategory' },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    attachment: { type: String, default: "task/noImg.jpg" },
    deadline: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    progress: { type: String, default: "working" },  //working , completed, pending
    status: { type: Boolean, default: true },

})

module.exports = mongoose.model('task', taskSchema)