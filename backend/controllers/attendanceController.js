const Attendance = require('../models/Attendance');

exports.markLogin = async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    try {
        let attendance = await Attendance.findOne({ employeeId: req.user._id, date: today });
        if (attendance) return res.status(400).json({ message: 'Already marked login for today' });

        attendance = await Attendance.create({
            employeeId: req.user._id,
            date: today,
            loginTime: new Date()
        });
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.markLogout = async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    try {
        let attendance = await Attendance.findOne({ employeeId: req.user._id, date: today });
        if (!attendance) return res.status(400).json({ message: 'No login record for today' });
        if (attendance.logoutTime) return res.status(400).json({ message: 'Already marked logout for today' });

        attendance.logoutTime = new Date();
        const diff = attendance.logoutTime - attendance.loginTime;
        attendance.totalHours = diff / (1000 * 60 * 60); // Convert ms to hours
        await attendance.save();
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find().populate('employeeId', 'name email department');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ employeeId: req.user._id });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
