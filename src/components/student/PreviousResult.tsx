import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.tsx';
import Header from './PreviousResultHeader.tsx';
import axios from 'axios';
import "../../styles/previousResult.css";
import { jwtDecode } from "jwt-decode";

// Define the expected structure of the decoded JWT payload
interface DecodedToken {
    id: string;  // Use 'id' instead of 'studentId'
    exp: number; // Expiry time of token
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("JWT Token:", token);

        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                console.log("Decoded Token:", decoded);  // Log the decoded token

                // Set studentId after decoding the token
                setStudentId(decoded.id);  // Corrected from 'studentId' to 'id'
                console.log("Set studentId:", decoded.id);  // Log studentId after setting it
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
        if (!studentId) return;  // Only fetch results if studentId is not null or undefined

        const fetchResults = async () => {
            console.log("Fetching results for studentId:", studentId);

            try {
                const token = localStorage.getItem("token");
                console.log("Sending request with token:", token); // Log token

                const response = await axios.get(`http://localhost:3000/api/results/${studentId}/all`, {
                    headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
                });

                console.log("API Response:", response.data);  // Log the response
                if (response.data && response.data.results) {
                    setResults(response.data.results);
                    setGpa(response.data.gpa); // Set GPA value from the backend response
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
    }, [studentId]);  // Fetch results when studentId is updated

    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="main-content flex-1 bg-gray-100 p-6">
                <Header />
                <div className="results-section shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Previous Results</h2>
                    {loading ? (
                        <p className="text-center text-gray-600">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : results.length === 0 ? (
                        <p className="text-center text-gray-500">No previous results available.</p>
                    ) : (
                        <>
                            <p className="text-center text-xl font-semibold mb-4">GPA: {gpa}</p>
                            <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden">
                                <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-2 border">Subject</th>
                                    <th className="px-4 py-2 border">Marks</th>
                                    <th className="px-4 py-2 border">Grade</th>
                                    <th className="px-4 py-2 border">Semester</th>
                                    <th className="px-4 py-2 border">Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {results.map((result, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white hover:bg-gray-100 transition-transform transform hover:translate-y-[-5px]"
                                    >
                                        <td className="px-4 py-2 border">{result.subject}</td>
                                        <td className="px-4 py-2 border">{result.marks}</td>
                                        <td className="px-4 py-2 border font-bold">{result.grade}</td>
                                        <td className="px-4 py-2 border">{result.semester}</td>
                                        <td className="px-4 py-2 border">{new Date(result.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviousResultsPage;
