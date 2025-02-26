import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './NewResultHeader';
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";

// Types
interface ProfileFormData {
    currentEmail: string;
    newEmail: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface DecodedToken {
    id: string;
    email: string;
    exp: number;
    [key: string]: any; // other fields in the token
}

interface Toast {
    message: string;
    type: 'success' | 'error';
}

const ProfileSettings: React.FC = () => {
    const [studentId, setStudentId] = useState<string | null>(null);
    const [studentInfo, setStudentInfo] = useState<{ email: string }>({ email: '' });
    const [formData, setFormData] = useState<ProfileFormData>({
        currentEmail: '',
        newEmail: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [toast, setToast] = useState<Toast | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'email' | 'password'>('email'); // Declare activeTab state

    // Decode token and retrieve student information
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);

                // Check if the token is expired
                const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
                if (decoded.exp < currentTime) {
                    setError("Token has expired, please log in again.");
                    setLoading(false);
                    return;
                }

                const studentData = {
                    id: decoded.id,
                    email: decoded.email,
                };

                setStudentId(decoded.id); // Set studentId from token
                setStudentInfo(studentData);
            } catch (err) {
                setError("Invalid token.");
            }
        } else {
            setError("No token found. Please log in.");
        }
        setLoading(false);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleEmailUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const { newEmail } = formData;

        if (newEmail === studentInfo.email) {
            showToast('New email cannot be the same as the current email', 'error');
            return;
        }

        if (!studentId) {
            showToast('Student not authenticated', 'error');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/students/edit/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: newEmail }),
            });

            if (response.ok) {
                showToast('Email updated successfully!', 'success');
                setStudentInfo(prev => ({ ...prev, email: newEmail }));
                setFormData(prev => ({ ...prev, currentEmail: '', newEmail: '' }));
            } else {
                showToast('Failed to update email', 'error');
            }
        } catch (error) {
            showToast('Error updating email', 'error');
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const { newPassword, confirmPassword } = formData;

        if (newPassword !== confirmPassword) {
            showToast('New passwords do not match', 'error');
            return;
        }

        if (!studentId) {
            showToast('Student not authenticated', 'error');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/students/edit/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: newPassword }),
            });

            if (response.ok) {
                showToast('Password updated successfully!', 'success');
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));
            } else {
                showToast('Failed to update password', 'error');
            }
        } catch (error) {
            showToast('Error updating password', 'error');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="main-content flex-1 bg-gray-100 p-6">
                <Header />

                <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
                    <div className="flex items-center mb-6">
                        <FaUser className="text-3xl text-blue-600 mr-4" />
                        <h1 className="text-2xl font-bold">Profile Settings</h1>
                    </div>

                    <div className="mb-6">
                        <div className="flex space-x-4 border-b">
                            <button
                                className={`py-2 px-4 ${activeTab === 'email' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('email')}
                            >
                                Email Settings
                            </button>
                            <button
                                className={`py-2 px-4 ${activeTab === 'password' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('password')}
                            >
                                Password Settings
                            </button>
                        </div>
                    </div>

                    {activeTab === 'email' ? (
                        <form onSubmit={handleEmailUpdate} className="space-y-4">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Email
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="email"
                                        name="currentEmail"
                                        value={formData.currentEmail}
                                        onChange={handleInputChange}
                                        className="pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Email
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="email"
                                        name="newEmail"
                                        value={formData.newEmail}
                                        onChange={handleInputChange}
                                        className="pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Update Email
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handlePasswordUpdate} className="space-y-4">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleInputChange}
                                        className="pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        className="pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Update Password
                            </button>
                        </form>
                    )}
                </div>

                {/* Toast Notification */}
                {toast && (
                    <div
                        className={`fixed bottom-4 right-4 p-4 rounded-md ${
                            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        } text-white flex items-center shadow-lg`}
                    >
                        {toast.type === 'success' ? (
                            <FaCheckCircle className="mr-2" />
                        ) : (
                            <FaCheckCircle className="mr-2" />
                        )}
                        {toast.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileSettings;
