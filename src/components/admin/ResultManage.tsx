import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from "./ResultManageHeader.tsx";
import { FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
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
                <Header />

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Results Table</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Add Result
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Student ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Subject</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Marks</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Semester</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {results.map((result) => (
                                <tr key={result.id}>
                                    <td className="px-6 py-4 text-sm text-gray-800">{result.studentId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{result.subject}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{result.marks}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{result.semester}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {new Date(result.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => handleEdit(result)}
                                            className="text-blue-600 hover:text-blue-800 mr-3"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(result.id)}
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
                                    {isEditing ? 'Edit Result' : 'Add New Result'}
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
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Marks
                                    </label>
                                    <input
                                        type="number"
                                        name="marks"
                                        value={formData.marks}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Semester
                                    </label>
                                    <input
                                        type="text"
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
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

export default ResultManagement;