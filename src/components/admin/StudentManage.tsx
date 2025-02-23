import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from "./StudentManageHeader.tsx";
import { FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../styles/Dashboard.css';

interface Student {
    id: number;
    studentId: string;
    name: string;
    email: string;
    password: string;
}

interface StudentFormData {
    studentId: string;
    name: string;
    email: string;
    password: string;
}

const StudentManagement: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState<StudentFormData>({
        studentId: '',
        name: '',
        email: '',
        password: ''
    });

    // Fetch students
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('/api/students');
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = isEditing ? `/api/students/${currentStudent?.id}` : '/api/students';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchStudents();
                handleCloseModal();
            }
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const handleEdit = (student: Student) => {
        setCurrentStudent(student);
        setFormData({
            studentId: student.studentId,
            name: student.name,
            email: student.email,
            password: student.password
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const response = await fetch(`/api/students/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchStudents();
                }
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentStudent(null);
        setFormData({
            studentId: '',
            name: '',
            email: '',
            password: ''
        });
    };

    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="main-content flex-1 bg-gray-100 p-6">
                <Header />

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Student Management</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Add Student
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Student ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 text-sm text-gray-800">{student.studentId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{student.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{student.email}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => handleEdit(student)}
                                            className="text-blue-600 hover:text-blue-800 mr-3"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
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
                                    {isEditing ? 'Edit Student' : 'Add New Student'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Student ID
                                    </label>
                                    <input
                                        type="text"
                                        name="studentId"
                                        value={formData.studentId}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
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

export default StudentManagement;
