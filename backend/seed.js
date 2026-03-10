const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const adminExists = await User.findOne({ role: 'Admin' });
        if (adminExists) {
            console.log('Admin already exists:', adminExists.email);
            process.exit(0);
        }

        const admin = new User({
            name: 'System Admin',
            email: 'admin@ems.com',
            password: 'adminpassword123',
            role: 'Admin',
            department: 'Management',
            designation: 'Super Admin'
        });

        await admin.save();
        console.log('Admin user created successfully!');
        console.log('Email: admin@ems.com');
        console.log('Password: adminpassword123');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
