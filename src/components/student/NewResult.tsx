import React, { useState } from 'react';
import Sidebar from './Sidebar.tsx';
import { FaCheckCircle, FaUsers, FaClipboardList } from 'react-icons/fa';
import Header from "./NewResultHeader.tsx";
import axios from 'axios';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change: string;
    period: string;
    changeType: 'positive' | 'negative' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, period, changeType }) => {
    return (
        <div className="stat-card p-6 bg-white shadow-lg rounded-lg flex items-center space-x-4">
            <div className="stat-card-icon text-4xl">{icon}</div>
            <div className="stat-card-content">
                <h3 className="text-xl font-semibold">{title}</h3>
                <h2 className="text-2xl font-bold">{value}</h2>
                <p className={`text-sm text-gray-500 ${changeType === 'positive' ? 'text-green-500' : changeType === 'negative' ? 'text-red-500' : 'text-gray-600'}`}>
                    {change} than {period}
                </p>
            </div>
        </div>
    );
};

const ResultCheckPage: React.FC = () => {
    const [studentNumber, setStudentNumber] = useState<string>('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentNumber(e.target.value);
    };

    const fetchResults = async () => {
        console.log('Fetching results for student:', studentNumber); // Debugging line
        if (!studentNumber) {
            setError('Please enter a student number.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`http://localhost:3000/api/results/${studentNumber}/latest`);

            console.log('API Response:', response.data); // Debugging line
            setResult(response.data.result);
        } catch (err: any) {
            console.log('Error:', err); // Debugging line
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="main-content flex-1 bg-gray-100 p-6">
                <Header />

                <div className="stats-row flex space-x-6 mb-8">
                    <StatCard
                        title="Total Results Checked"
                        value={result ? 1 : 0} // Show 1 if there's a result
                        icon={<FaClipboardList />}
                        change="+5%"
                        period="last week"
                        changeType="positive"
                    />
                    <StatCard
                        title="Student Queries Today"
                        value="120"
                        icon={<FaUsers />}
                        change="+10%"
                        period="yesterday"
                        changeType="positive"
                    />
                    <StatCard
                        title="Successful Results"
                        value="100%"
                        icon={<FaCheckCircle />}
                        change="0%"
                        period="today"
                        changeType="neutral"
                    />
                </div>

                <div className="search-section bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-center mb-4">Check Student Results</h2>
                    <input
                        type="text"
                        placeholder="Enter student number"
                        value={studentNumber}
                        onChange={handleInputChange}
                        className="w-full py-2 px-4 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button
                        onClick={fetchResults}
                        className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-300"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Check Results'}
                    </button>
                    {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                </div>

                {result && (
                    <div className="results-section bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Student Results</h3>
                        <table className="min-w-full table-auto">
                            <thead>
                            <tr>
                                <th className="border px-4 py-2">Subject</th>
                                <th className="border px-4 py-2">Score</th>
                                <th className="border px-4 py-2">Grade</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border px-4 py-2">{result.subject}</td>
                                <td className="border px-4 py-2">{result.marks}</td>
                                <td className="border px-4 py-2">{result.grade}</td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultCheckPage;
