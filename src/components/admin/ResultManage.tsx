import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from "./ResultManageHeader.tsx";
import {FaTimes, FaEdit, FaTrash, FaPlus, FaUserShield} from 'react-icons/fa';
import '../../styles/Dashboard.css';
import axios from "axios";
import Swal from "sweetalert2";

interface Result {
    id: number;
    studentId: string;
    subject: string;
    marks: number;
    semester: string;
    date: string;
}

interface ResultFormData {
    studentId: string;
    subject: string;
    marks: number;
    semester: string;
    date: string;
}

const ResultManagement: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentResult, setCurrentResult] = useState<Result | null>(null);
    const [formData, setFormData] = useState<ResultFormData>({
        studentId: '',
        subject: '',
        marks: 0,
        semester: '',
        date: new Date().toISOString().split('T')[0]
    });
   // Function to close modal and reset form state
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentResult(null);
        setFormData({
            studentId: '',
            subject: '',
            marks: 0,
            semester: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    // Fetch results
    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/admin/getResults');
            console.log('API Response:', response.data); // Debugging

            // Access 'results' array from the response
            setResults(Array.isArray(response.data.results) ? response.data.results : []);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'marks' ? parseInt(value) : value
        }));
    };

    // Submit form data (add/edit result)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure the date is in ISO format
        const formattedDate = new Date(formData.date).toISOString();
        const dataToSend = { ...formData, date: formattedDate }; // Add the formatted date

        const url = isEditing
            ? `http://localhost:3000/api/admin/edit-result/${currentResult?.id}`
            : 'http://localhost:3000/api/admin/add-result';

        const method = isEditing ? axios.put : axios.post;

        try {
            // Make the API request
            await method(url, dataToSend, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: `Result ${isEditing ? 'updated' : 'added'} successfully.`,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            fetchResults();  // Refresh results
            handleCloseModal();  // Close modal after submission
        } catch (error: any) {
            if (error.response) {
                // Show error alert
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.message || 'An error occurred while saving the result.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };


    // Handle editing a result
    const handleEdit = (result: Result) => {
        setCurrentResult(result);
        setFormData({
            studentId: result.studentId,
            subject: result.subject,
            marks: result.marks,
            semester: result.semester,
            date: new Date(result.date).toISOString().split('T')[0]
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    // Handle deleting a result
    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this result?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/admin/delete-result/${id}`);

                // Show success alert
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The result has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                fetchResults();
            } catch (error) {
                // Show error alert
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while deleting the result.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="main-content flex-1 bg-gray-100 p-6">
                <Header/>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Results Table</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
                        >
                            <FaPlus className="mr-2"/>
                            Add Result
                        </button>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md">
                        {/*<h2 className="text-2xl font-bold text-gray-800 mb-4">Student Results</h2>*/}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead>
                                <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                                    <th className="px-6 py-4 text-left text-lg font-bold text-white">Student ID</th>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-white">Subject</th>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-white">Marks</th>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-white">Semester</th>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-white">Date</th>
                                    <th className="px-6 py-4 text-left text-lg font-bold text-white">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {results.map((result) => (
                                    <tr
                                        key={result.id}
                                        className="transition-colors duration-200 ease-in-out hover:bg-blue-50"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{result.studentId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{result.subject}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                    {result.marks}
                  </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{result.semester}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">
                                            {new Date(result.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(result)}
                                                className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-full transition-colors duration-200"
                                                title="Edit"
                                            >
                                                <FaEdit/>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(result.id)}
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
                                        {isEditing ? 'Edit Result' : 'Add New Result'}
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
                                            placeholder="Enter Student ID"
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-1 bg-blue-600 transition-all duration-300 rounded-b-lg"></div>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 bg-gray-50 outline-none"
                                            required
                                            placeholder="Enter Subject"
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-1 bg-blue-600 transition-all duration-300 rounded-b-lg"></div>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Marks</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="marks"
                                            value={formData.marks}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 bg-gray-50 outline-none"
                                            required
                                            placeholder="Enter Marks"
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-1 bg-blue-600 transition-all duration-300 rounded-b-lg"></div>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="semester"
                                            value={formData.semester}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 bg-gray-50 outline-none"
                                            required
                                            placeholder="Enter Semester"
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-1 bg-blue-600 transition-all duration-300 rounded-b-lg"></div>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-0 focus:border-blue-500 transition-all duration-200 bg-gray-50 outline-none"
                                            required
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

export default ResultManagement;