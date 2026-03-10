#!/bin/bash

echo "🚀 Starting Employee Management System Setup..."

# 1. Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null
then
    echo "⚠️  MongoDB is not running. Attempting to start it via Homebrew..."
    brew services start mongodb-community@7.0
    sleep 5 # Give it time to start
fi

# 2. Check again
if ! pgrep -x "mongod" > /dev/null
then
    echo "❌ Failed to start MongoDB automatically."
    echo "Please run: brew services start mongodb-community@7.0"
    exit 1
else
    echo "✅ MongoDB is running."
fi

# 3. Create Admin User (Seed)
echo "👤 Seeding Admin data..."
cd backend && node seed.js
cd ..

# 4. Final Instructions
echo "------------------------------------------------"
echo "✅ All set! To run the application:"
echo "1. Backend: Open terminal and run: cd backend && node server.js"
echo "2. Frontend: Open terminal and run: cd frontend && npm run dev"
echo "------------------------------------------------"
echo "Login: admin@ems.com / adminpassword123"
