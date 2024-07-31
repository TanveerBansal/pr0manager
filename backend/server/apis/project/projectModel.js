const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    attachment: { type: String, default: "project/noImg.jpg" },
    client: { type: String, default: "" },
    technology: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
})

module.exports = mongoose.model('project', projectSchema)