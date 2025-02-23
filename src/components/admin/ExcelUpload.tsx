import React, { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from "./ExcelUploadHeader";

const ExcelUploadPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        // Add your upload logic here
        setUploading(false);
    };

    const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
        <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center gap-4">
                <div className="text-blue-500">{icon}</div>
                <div>
                    <h3 className="text-gray-600">{title}</h3>
                    <p className="text-xl font-semibold">{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    <Header />


                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <StatCard
                            title="Total Uploads"
                            value="245"
                            icon={<span className="text-2xl">⭕</span>}
                        />
                        <StatCard
                            title="Successful Imports"
                            value="230"
                            icon={<span className="text-2xl">✓</span>}
                        />
                        <StatCard
                            title="Processing"
                            value="15"
                            icon={<span className="text-2xl">📄</span>}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-medium text-center mb-6">Upload Results Excel Sheet</h2>

                        <div
                            className="border-2 border-dashed rounded-lg p-8 text-center"
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center gap-4">
                                <FileSpreadsheet className="w-12 h-12 text-gray-400" />
                                <div>
                                    <p className="mb-2">
                                        Drop your Excel file here or{' '}
                                        <label className="text-blue-500 cursor-pointer hover:underline">
                                            browse
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".xlsx,.xls"
                                                onChange={handleFileInput}
                                            />
                                        </label>
                                    </p>
                                    <p className="text-sm text-gray-500">Supports: .xlsx, .xls</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className="mt-6 w-full py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                        >
                            Upload Results
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcelUploadPage;