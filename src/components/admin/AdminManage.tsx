import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './AdminManageHeader.tsx';
import { FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../styles/Dashboard.css';

import axios from 'axios';
import Swal from 'sweetalert2';

interface Admin {
    id: number;
    username: string;
    email: string;
    password: string;
    students: string[];
}

interface AdminFormData {
    username: string;
    email: string;
    password: string;
}

const AdminManagement: React.FC = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
    const [formData, setFormData] = useState<AdminFormData>({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/admin/getAllAdmins');

            console.log('API Response:', response.data); // ✅ Debugging line

            // Correctly access the admins array inside the response object
            if (response.data && Array.isArray(response.data.admins)) {
                setAdmins(response.data.admins);
            } else {
                console.error('Unexpected API response:', response.data);
                setAdmins([]); // Prevent map errors
            }
        } catch (error) {
            console.error('Error fetching admins:', error);
            Swal.fire('Error', 'Failed to fetch admins', 'error');
            setAdmins([]); // Fallback to prevent errors
        }
    };



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = isEditing ? `http://localhost:3000/api/admin/edit-admin/${currentAdmin?.id}` : 'http://localhost:3000/api/admin/add-admin';
            const method = isEditing ? 'put' : 'post';

            const response = await axios({
                method,
                url,
                headers: { 'Content-Type': 'application/json' },
                data: formData,
            });

            if (response.status === 200 || response.status === 201) {
                fetchAdmins();
                handleCloseModal();
                Swal.fire('Success', 'Admin saved successfully', 'success');
            }
        } catch (error) {
            console.error('Error saving admin:', error);
            Swal.fire('Error', 'Failed to save admin', 'error');
        }
    };

    const handleEdit = (admin: Admin) => {
        setCurrentAdmin(admin);
        setFormData({
            username: admin.username,
            email: admin.email,
            password: admin.password, // Don't prefill password
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the admin permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/admin/delete-admin/${id}`);
                if (response.status === 200) {
                    fetchAdmins();
                    Swal.fire('Deleted!', 'Admin has been deleted.', 'success');
                }
            } catch (error) {
                console.error('Error deleting admin:', error);
                Swal.fire('Error', 'Failed to delete admin', 'error');
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentAdmin(null);
        setFormData({
            username: '',
            email: '',
            password: '',
        });
    };


    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="main-content flex-1 bg-gray-100 p-6">
                <Header />

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Admins Table</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Add Admin
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Username</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Students</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {Array.isArray(admins) && admins.length > 0 ? (
                                admins.map((admin) => (
                                    <tr key={admin.id}>
                                        <td className="px-6 py-4 text-sm text-gray-800">{admin.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{admin.username}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{admin.email}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <button onClick={() => handleEdit(admin)}
                                                    className="text-blue-600 hover:text-blue-800 mr-3">
                                                <FaEdit/>
                                            </button>
                                            <button onClick={() => handleDelete(admin.id)}
                                                    className="text-red-600 hover:text-red-800">
                                                <FaTrash/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-gray-600">No admins found.</td>
                                </tr>
                            )}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    {isEditing ? 'Edit Admin' : 'Add New Admin'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes/>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                                    >
                                        {isEditing ? 'Update' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminManagement;
