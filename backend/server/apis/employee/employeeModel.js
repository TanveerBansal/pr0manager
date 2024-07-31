const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    contact: { type: String, default: "" },
    picture: { type: String, default: "employee/noImg.png" },
    coins: { type: Number, default: 0 },
    experience: { type: String, default: "" },
    jobtitle: { type: String, default: "" },
    joiningdate: { type: Date, default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
})

module.exports = mongoose.model('employee', employeeSchema)