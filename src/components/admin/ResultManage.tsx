import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from "./ResultManageHeader.tsx";
import { FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../styles/Dashboard.css';

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

    // Fetch results
    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const response = await fetch('/api/results');
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'marks' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = isEditing ? `/api/results/${currentResult?.id}` : '/api/results';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchResults();
                handleCloseModal();
            }
        } catch (error) {
            console.error('Error saving result:', error);
        }
    };

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

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this result?')) {
            try {
                const response = await fetch(`/api/results/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchResults();
                }
            } catch (error) {
                console.error('Error deleting result:', error);
            }
        }
    };

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