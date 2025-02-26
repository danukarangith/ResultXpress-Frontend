import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.tsx';
import Header from './PreviousResultHeader.tsx';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { saveAs } from 'file-saver';

// Define the expected structure of the decoded JWT payload
interface DecodedToken {
    id: string;
    exp: number;
    email:string;
}

interface Result {
    subject: string;
    marks: number;
    grade: string;
    semester: string;
    date: string;
}

interface StudentInfo {
    id: string;
    email: string;

}

const ResultReportDownload: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
    const [gpa, setGpa] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [studentId, setStudentId] = useState<string | null>(null);
    const [downloadingAll, setDownloadingAll] = useState(false);
    const [downloadingLatest, setDownloadingLatest] = useState(false);



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);



                const studentData: StudentInfo = {
                    id: decoded.id,
                    email: decoded.email,


                };

                setStudentInfo(studentData);
                setStudentId(decoded.id); // Set studentId from token
            } catch (err) {
                setError("Invalid token.");
            }
        } else {
            setError("No token found. Please log in.");
        }
        setLoading(false);
    }, []);



    useEffect(() => {
        if (!studentId) return;

        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                // Fetch results
                const resultsResponse = await axios.get(`http://localhost:3000/api/results/${studentId}/all?report=pdf`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (resultsResponse.data && resultsResponse.data.results) {
                    setResults(resultsResponse.data.results);
                    setGpa(resultsResponse.data.gpa);
                } else {
                    setResults([]);
                }

                // Fetch student info
                const studentResponse = await axios.get(`http://localhost:3000/api/results/${studentId}/latest?report=pdf`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (studentResponse.data) {
                    setStudentInfo(prevState => ({
                        ...prevState,
                        ...studentResponse.data, // Update with the latest student info
                    }));
                }
            } catch (err: any) {
                setError(err.response?.data?.message || "Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [studentId]);


    const downloadAllResults = async () => {
        // Ensure studentId is set before trying to download
        if (!studentId) {
            setError("Student ID is missing!");
            console.log("Student ID is not available in downloadAllResults function");
            return;
        }

        console.log("Downloading all results for student ID:", studentId);
        setDownloadingAll(true);
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`http://localhost:3000/api/results/${studentId}/all?report=pdf`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, `all_results_${studentId}.pdf`);
        } catch (err: any) {
            setError("Error downloading report");
            console.error("Error downloading all results:", err);
        } finally {
            setDownloadingAll(false);
        }
    };

    const downloadLatestResult = async () => {
        // Ensure studentId is set before trying to download
        if (!studentId) {
            setError("Student ID is missing!");
            console.log("Student ID is not available in downloadLatestResult function");
            return;
        }

        console.log("Downloading latest result for student ID:", studentId);
        setDownloadingLatest(true);
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`http://localhost:3000/api/results/${studentId}/latest?report=pdf`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, `latest_result_${studentId}.pdf`);
        } catch (err: any) {
            setError("Error downloading report");
            console.error("Error downloading latest result:", err);
        } finally {
            setDownloadingLatest(false);
        }
    };

    // Group results by semester for displaying
    const semesterGroups = results.reduce<Record<string, Result[]>>((acc, result) => {
        if (!acc[result.semester]) {
            acc[result.semester] = [];
        }
        acc[result.semester].push(result);
        return acc;
    }, {});


    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="main-content flex-1 bg-gray-100 p-6">
                <Header />

                <main className="flex-2 overflow-y-auto p-6">
                    <div className="max-w-8xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                            <div className="p-6 border-b border-gray-200">
                                <h1 className="text-2xl font-bold text-gray-800">Result Reports</h1>
                                <p className="text-gray-600 mt-2">Download your academic result reports in PDF format</p>
                            </div>

                            <div className="p-6">
                                {loading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                                    </div>
                                ) : error ? (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                                        <p>{error}</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Student Info Card */}
                                        {studentInfo && (
                                            <div className="bg-indigo-50 rounded-lg p-6 mb-8">
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                                    <div>
                                                        <h3 className="text-xs font-semibold text-indigo-500 uppercase">Student ID</h3>
                                                        <p className="mt-1 text-gray-900 font-medium">{studentInfo.id}</p>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs font-semibold text-indigo-500 uppercase">Name</h3>
                                                        <p className="mt-1 text-gray-900 font-medium">student</p>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs font-semibold text-indigo-500 uppercase">Program</h3>
                                                        <p className="mt-1 text-gray-900 font-medium">GDSE</p>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs font-semibold text-indigo-500 uppercase">Email</h3>
                                                        <p className="mt-1 text-gray-900 font-medium">{studentInfo.email}</p>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs font-semibold text-indigo-500 uppercase">Enrollment Year</h3>
                                                        <p className="mt-1 text-gray-900 font-medium">2025</p>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs font-semibold text-indigo-500 uppercase">Overall GPA</h3>
                                                        <p className="mt-1 text-gray-900 font-medium">{gpa || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Download Options */}
                                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Download Options</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                                    <div className="flex items-center mb-4">
                                                        <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 className="h-6 w-6 text-indigo-600" fill="none"
                                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-md font-medium text-gray-900">Complete
                                                                Academic Record</h3>
                                                            <p className="text-sm text-gray-500">Download all your
                                                                academic results</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={downloadAllResults}
                                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                                    >
                                                        {downloadingAll ? (
                                                            <>
                                                                <svg
                                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <circle
                                                                        className="opacity-25"
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="4"
                                                                    ></circle>
                                                                    <path
                                                                        className="opacity-75"
                                                                        fill="currentColor"
                                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                    ></path>
                                                                </svg>
                                                                Processing...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="-ml-1 mr-2 h-5 w-5"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                                    />
                                                                </svg>
                                                                Download All Results
                                                            </>
                                                        )}
                                                    </button>

                                                </div>

                                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                                    <div className="flex items-center mb-4">
                                                        <div className="bg-green-100 p-3 rounded-full mr-4">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 className="h-6 w-6 text-green-600" fill="none"
                                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-md font-medium text-gray-900">Latest
                                                                Results</h3>
                                                            <p className="text-sm text-gray-500">Download your most
                                                                recent semester results</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={downloadLatestResult}
                                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                                                    >
                                                        {downloadingLatest ? (
                                                            <>
                                                                <svg
                                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <circle
                                                                        className="opacity-25"
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="4"
                                                                    ></circle>
                                                                    <path
                                                                        className="opacity-75"
                                                                        fill="currentColor"
                                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                    ></path>
                                                                </svg>
                                                                Processing...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="-ml-1 mr-2 h-5 w-5"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                                    />
                                                                </svg>
                                                                Download Latest Results
                                                            </>
                                                        )}
                                                    </button>

                                                </div>
                                            </div>
                                        </div>

                                        {/* Results Summary */}
                                        <div className="bg-white border border-gray-200 rounded-lg">
                                            <div className="border-b border-gray-200 px-6 py-4">
                                                <h2 className="text-lg font-semibold text-gray-800">Available Results
                                                    Summary</h2>
                                            </div>

                                            {Object.keys(semesterGroups).length === 0 ? (
                                                <div className="p-6 text-center text-gray-500">
                                                    No results grouping yet
                                                </div>
                                            ) : (
                                                <div className="divide-y divide-gray-200">
                                                    {Object.entries(semesterGroups).map(([semester, semesterResults]) => (
                                                        <div key={semester} className="px-6 py-4">
                                                            <h3 className="text-md font-medium text-gray-900 mb-2">{semester}</h3>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                {semesterResults.map((result, index) => (
                                                                    <div key={index} className="bg-gray-50 rounded-md p-3 flex justify-between">
                                                                        <span className="text-sm font-medium text-gray-700">{result.subject}</span>
                                                                        <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                                                                            result.grade === 'A' ? 'bg-green-100 text-green-800' :
                                                                                result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                                                                                    result.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                                                                                        result.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                                                                                            result.grade === 'F' ? 'bg-red-100 text-red-800' :
                                                                                                'bg-gray-100 text-gray-800'
                                                                        }`}>
                                                                            {result.grade}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ResultReportDownload;