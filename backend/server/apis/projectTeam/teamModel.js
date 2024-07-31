const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    projectId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'project' },
    employeeId: [
        { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' }
    ],
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
})

module.exports = mongoose.model('projectteam', teamSchema)