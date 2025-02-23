import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaDownload, FaFileAlt, FaSearch } from 'react-icons/fa';
import Header from "./NewResultHeader";
import "../../styles/Download.css";


// Types
interface Report {
    id: string;
    type: string;
    date: string;
    status: 'available' | 'processing';
    fileName: string;
}

// Stat Card Component
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
                <p className={`text-sm ${changeType === 'positive' ? 'text-green-500' : changeType === 'negative' ? 'text-red-500' : 'text-gray-600'}`}>
                    {change} than {period}
                </p>
            </div>
        </div>
    );
};

// Report Table Component
const ReportTable: React.FC<{ reports: Report[] }> = ({ reports }) => {
    const handleDownload = (reportId: string) => {
        // Implement download logic here
        console.log(`Downloading report ${reportId}`);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                    <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    report.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {report.status}
                                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                                onClick={() => handleDownload(report.id)}
                                disabled={report.status !== 'available'}
                                className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                                    report.status === 'available'
                                        ? 'text-blue-700 border-blue-700 hover:bg-blue-50'
                                        : 'text-gray-400 border-gray-300 cursor-not-allowed'
                                }`}
                            >
                                <FaDownload className="mr-2" />
                                Download
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// Main Download Report Page Component
const DownloadReportPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data - replace with actual data from your backend
    const sampleReports: Report[] = [
        { id: 'REP001', type: 'Results Summary', date: '2025-02-23', status: 'available', fileName: 'results_summary_001.pdf' },
        { id: 'REP002', type: 'Student Performance', date: '2025-02-23', status: 'processing', fileName: 'performance_002.pdf' },
        { id: 'REP003', type: 'Class Analytics', date: '2025-02-22', status: 'available', fileName: 'analytics_003.pdf' },
    ];

    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="main-content flex-1 bg-gray-100 p-6">
                <Header/>

                <div className="stats-row flex space-x-6 mb-8">
                    <StatCard
                        title="Total Reports"
                        value={sampleReports.length}
                        icon={<FaFileAlt/>}
                        change="+2"
                        period="last week"
                        changeType="positive"
                    />
                    <StatCard
                        title="Available Reports"
                        value={sampleReports.filter(r => r.status === 'available').length}
                        icon={<FaDownload/>}
                        change="+1"
                        period="yesterday"
                        changeType="positive"
                    />
                </div>

                <div className="mb-8">
                    <div className="relative w-full max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Search reports..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <ReportTable reports={sampleReports}/>
            </div>
        </div>
    );
};

export default DownloadReportPage;