import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import EmployeeManagement from './pages/Admin/EmployeeManagement';
import TaskManagement from './pages/Admin/TaskManagement';
import LeaveManagement from './pages/Admin/LeaveManagement';
import AttendanceReport from './pages/Admin/AttendanceReport';

// Employee Pages
import EmployeeDashboard from './pages/Employee/Dashboard';
import MyTasks from './pages/Employee/MyTasks';
import MyLeaves from './pages/Employee/MyLeaves';
import MyAttendance from './pages/Employee/MyAttendance';

const Layout = ({ children }) => (
    <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-65px)]">
                {children}
            </main>
        </div>
    </div>
);

function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

            <Route path="/" element={
                <ProtectedRoute>
                    <Layout>
                        {user?.role === 'Admin' ? <AdminDashboard /> : <EmployeeDashboard />}
                    </Layout>
                </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/employees" element={
                <ProtectedRoute role="Admin">
                    <Layout><EmployeeManagement /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/tasks" element={
                <ProtectedRoute role="Admin">
                    <Layout><TaskManagement /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/leaves" element={
                <ProtectedRoute role="Admin">
                    <Layout><LeaveManagement /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/attendance" element={
                <ProtectedRoute role="Admin">
                    <Layout><AttendanceReport /></Layout>
                </ProtectedRoute>
            } />

            {/* Employee Routes */}
            <Route path="/tasks/my" element={
                <ProtectedRoute role="Employee">
                    <Layout><MyTasks /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/leaves/my" element={
                <ProtectedRoute role="Employee">
                    <Layout><MyLeaves /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/attendance/my" element={
                <ProtectedRoute role="Employee">
                    <Layout><MyAttendance /></Layout>
                </ProtectedRoute>
            } />

            {/* Fallback for Employee specific paths when logged in as Admin */}
            <Route path="/tasks" element={
                <ProtectedRoute role="Employee">
                    <Layout><MyTasks /></Layout>
                </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
