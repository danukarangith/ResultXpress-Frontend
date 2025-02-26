import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar.tsx';
import Header from './PreviousResultHeader.tsx';
import axios from 'axios';
import "../../styles/previousResult.css";
import {jwtDecode} from "jwt-decode";

// Define the expected structure of the decoded JWT payload
interface DecodedToken {
    id: string;
    exp: number;
}

interface Result {
    subject: string;
    marks: number;
    grade: string;
    semester: string;
    date: string;
}

const PreviousResultsPage: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [gpa, setGpa] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [studentId, setStudentId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>("all");

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("JWT Token:", token);

        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                console.log("Decoded Token:", decoded);

                setStudentId(decoded.id);
                console.log("Set studentId:", decoded.id);
            } catch (error) {
                console.error("Invalid token:", error);
                setError("Invalid token");
                setLoading(false);
                return;
            }
        } else {
            setError("No authentication token found");
            setLoading(false);
            return;
        }
    }, []);

    useEffect(() => {
        if (!studentId) return;

        const fetchResults = async () => {
            console.log("Fetching results for studentId:", studentId);

            try {
                const token = localStorage.getItem("token");
                console.log("Sending request with token:", token);

                const response = await axios.get(`http://localhost:3000/api/results/${studentId}/all`, {
                    headers: {Authorization: `Bearer ${token}`},
                });

                console.log("API Response:", response.data);
                if (response.data && response.data.results) {
                    setResults(response.data.results);
                    setGpa(response.data.gpa);
                } else {
                    setResults([]);
                }
            } catch (err: any) {
                setError(err.response?.data?.message || "Error fetching results");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [studentId]);

    // Group results by semester for tab filtering
    const semesters = [...new Set(results.map(result => result.semester))];

    const filteredResults = activeTab === "all"
        ? results
        : results.filter(result => result.semester === activeTab);

    const getGradeColor = (grade: string) => {
        switch (grade) {
            case 'A':
                return 'bg-green-100 text-green-800';
            case 'B':
                return 'bg-blue-100 text-blue-800';
            case 'C':
                return 'bg-yellow-100 text-yellow-800';
            case 'D':
                return 'bg-orange-100 text-orange-800';
            case 'F':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="dashboard-container flex">
            <Sidebar/>
            <div className="main-content flex-1 bg-gray-100 p-6">
                <Header/>

                <main className="flex-2 overflow-y-auto p-6">
                    <div className="max-w-8xl mx-auto"> {/* Increased container width */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-2xl font-bold text-gray-800">Academic Performance</h1>
                                    {gpa && (
                                        <div className="flex items-center bg-indigo-50 rounded-lg px-4 py-2">
                                            <div className="mr-3">
                                                <div className="text-xs text-indigo-500 font-semibold">OVERALL GPA</div>
                                                <div className="text-2xl font-bold text-indigo-600">{gpa}</div>
                                            </div>
                                            <div
                                                className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Semester Tabs */}
                                <div className="border-b border-gray-200 mb-6">
                                    <nav className="-mb-px flex space-x-6">
                                        <button
                                            onClick={() => setActiveTab("all")}
                                            className={`py-3 px-1 border-b-2 font-medium text-sm ${
                                                activeTab === "all"
                                                    ? "border-indigo-500 text-indigo-600"
                                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }`}
                                        >
                                            All Semesters
                                        </button>
                                        {semesters.map(semester => (
                                            <button
                                                key={semester}
                                                onClick={() => setActiveTab(semester)}
                                                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                                                    activeTab === semester
                                                        ? "border-indigo-500 text-indigo-600"
                                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                }`}
                                            >
                                                {semester}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            <div className="px-6 py-4">
                                {loading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <div
                                            className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                                    </div>
                                ) : error ? (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                                        <p>{error}</p>
                                    </div>
                                ) : filteredResults.length === 0 ? (
                                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                        <p className="text-gray-600 text-lg">No results available for this
                                            selection.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                            <tr className="bg-gray-50">
                                                <th scope="col"
                                                    className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject
                                                </th>
                                                {/* Increased padding */}
                                                <th scope="col"
                                                    className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks
                                                </th>
                                                {/* Increased padding */}
                                                <th scope="col"
                                                    className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade
                                                </th>
                                                {/* Increased padding */}
                                                <th scope="col"
                                                    className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester
                                                </th>
                                                {/* Increased padding */}
                                                <th scope="col"
                                                    className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date
                                                </th>
                                                {/* Increased padding */}
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredResults.map((result, index) => (
                                                <tr key={index}
                                                    className="hover:bg-gray-50 transition-all duration-150">
                                                    <td className="px-8 py-4 whitespace-nowrap"> {/* Increased padding */}
                                                        <div
                                                            className="text-sm font-medium text-gray-900">{result.subject}</div>
                                                    </td>
                                                    <td className="px-8 py-4 whitespace-nowrap"> {/* Increased padding */}
                                                        <div className="text-sm text-gray-900">{result.marks}</div>
                                                    </td>
                                                    <td className="px-8 py-4 whitespace-nowrap"> {/* Increased padding */}
                                                        <span
                                                            className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getGradeColor(result.grade)}`}>
                                                        {result.grade}
                                                    </span>
                                                    </td>
                                                    <td className="px-8 py-4 whitespace-nowrap"> {/* Increased padding */}
                                                        <div className="text-sm text-gray-500">{result.semester}</div>
                                                    </td>
                                                    <td className="px-8 py-4 whitespace-nowrap"> {/* Increased padding */}
                                                        <div
                                                            className="text-sm text-gray-500">{new Date(result.date).toLocaleDateString()}</div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}


    export default PreviousResultsPage;