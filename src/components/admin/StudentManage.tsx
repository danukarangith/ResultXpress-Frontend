import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from "./StudentManageHeader.tsx";
import {FaTimes, FaEdit, FaTrash, FaPlus, FaUserShield} from 'react-icons/fa';
// import '../../styles/Dashboard.css';
import axios from "axios";
import Swal from "sweetalert2";

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
            const response = await axios.get('http://localhost:3000/api/students/getStudents');
            setStudents(response.data);
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
            const url = isEditing ? `http://localhost:3000/api/students/edit/${currentStudent?.studentId}` : 'http://localhost:3000/api/students/add';
            const method = isEditing ? 'put' : 'post';

            const response = await axios({
                method,
                url,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: formData,
            });

            if (response.status === 200 || response.status === 201) {
                fetchStudents();
                handleCloseModal();
                Swal.fire('Success!', 'Student has been saved successfully.', 'success');
            }
        } catch (error) {
            console.error('Error saving student:', error);
            Swal.fire('Error!', 'There was an issue saving the student.', 'error');
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
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the student permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/students/delete/${id}`);
                if (response.status === 200) {
                    fetchStudents();
                    Swal.fire('Deleted!', 'Student has been deleted.', 'success');
                }
            } catch (error) {
                console.error('Error deleting student:', error);
                Swal.fire('Error!', 'There was an issue deleting the student.', 'error');
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
                            <FaPlus className="mr-2"/>
                            Add Student
                        </button>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md">
                        {/*<h2 className="text-2xl font-bold text-gray-800 mb-4">Student List</h2>*/}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead>
                                <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                                    <th className="px-6 py-4 text-left text-lg font-bold text-white">Student ID</th>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-white">Name</th>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-white">Email</th>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-white">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {students.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="transition-colors duration-200 ease-in-out hover:bg-blue-50"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.studentId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{student.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{student.email}</td>
                                        <td className="px-6 py-4 text-sm flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(student)}
                                                className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-full transition-colors duration-200"
                                                title="Edit"
                                            >
                                                <FaEdit/>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student.id)}
                                                className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-full transition-colors duration-200"
                                                title="Delete"
                                            >
                                                <FaTrash/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
                        <div
                            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border-t-4 border-blue-600 transform transition-all duration-300 scale-100">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <FaUserShield className="text-blue-600 text-xl"/>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {isEditing ? 'Edit Student' : 'Add New Student'}
                                    </h2>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors duration-200"
                                    aria-label="Close"
                                >
                                    <FaTimes className="text-gray-600"/>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="studentId"
                                            value={formData.studentId}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 bg-gray-50 outline-none"
                                            required
                                            placeholder="Enter student ID"
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-1 bg-blue-600 transition-all duration-300 rounded-b-lg"></div>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 bg-gray-50 outline-none"
                                            required
                                            placeholder="Enter name"
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-1 bg-blue-600 transition-all duration-300 rounded-b-lg"></div>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 bg-gray-50 outline-none"
                                            required
                                            placeholder="Enter email address"
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-1 bg-blue-600 transition-all duration-300 rounded-b-lg"></div>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 bg-gray-50 outline-none"
                                            required
                                            placeholder="Enter password"
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-1 bg-blue-600 transition-all duration-300 rounded-b-lg"></div>
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end space-x-3">
                                <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-3 font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition duration-200"
                                    >
                                        {isEditing ? 'Update Student' : 'Create Student'}
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
