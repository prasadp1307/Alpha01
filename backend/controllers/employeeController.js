const User = require('../models/User');

exports.getEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'Employee' }).select('-password');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id).select('-password');
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const employee = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    const { name, email, password, department, designation, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password, department, designation, role: role || 'Employee' });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
