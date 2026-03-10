const Leave = require('../models/Leave');

exports.applyLeave = async (req, res) => {
    try {
        const leave = await Leave.create({
            ...req.body,
            employeeId: req.user._id
        });
        res.status(201).json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('employeeId', 'name email department');
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ employeeId: req.user._id });
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLeaveStatus = async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
