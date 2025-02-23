import React from 'react';
import Sidebar from './Sidebar.tsx';

import "../../styles/previousResult.css";
import Header from "./PreviousResultHeader.tsx";

// Sample data for previous results
const previousResults = [
    { subject: "Mathematics", marks: 85, passMark: 50,grade:"A" },
    { subject: "English", marks: 78, passMark: 50 },
    { subject: "Science", marks: 90, passMark: 50 },
    { subject: "History", marks: 70, passMark: 50 },
    { subject: "Geography", marks: 65, passMark: 50 },
];

const PreviousResultsPage: React.FC = () => {
    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="main-content flex-1 bg-gray-100 p-6">
                <Header/>

                <div className="results-section shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Previous Results</h2>
                    <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2 border">Subject</th>
                            <th className="px-4 py-2 border">Marks</th>
                            <th className="px-4 py-2 border">Pass Mark</th>
                            <th className="px-4 py-2 border">Grade</th>
                        </tr>
                        </thead>
                        <tbody>
                        {previousResults.map((result, index) => (
                            <tr
                                key={index}
                                className="bg-white hover:bg-gray-100 transition-transform transform hover:translate-y-[-5px]"
                            >
                                <td className="px-4 py-2 border">{result.subject}</td>
                                <td className="px-4 py-2 border">{result.marks}</td>
                                <td className="px-4 py-2 border">{result.passMark}</td>
                                <td className="px-4 py-2 border font-bold">{result.grade}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PreviousResultsPage;
