const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    loginTime: { type: Date, required: true },
    logoutTime: { type: Date },
    totalHours: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
