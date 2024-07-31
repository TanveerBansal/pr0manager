const mongoose = require('mongoose')
const coinSchema = mongoose.Schema({
    autoId: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    taskId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'task' },
    message: { type: String, default: null },
    coinCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, default: null },
    status: { type: Boolean, default: true }
})

module.exports = mongoose.model('coin', coinSchema)