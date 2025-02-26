import React, { useState } from 'react';
import { FileSpreadsheet, XCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './ExcelUploadHeader';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

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

    const removeFile = () => {
        setFile(null);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3000/api/admin/upload-results', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
            });

            setFile(null);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.message || 'An error occurred during upload.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'An unexpected error occurred.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="dashboard-container flex">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    <Header />

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-medium text-center mb-6">Upload Results Excel Sheet</h2>

                        <div
                            className="border-2 border-dashed rounded-lg p-8 text-center"
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {file ? (
                                <div className="flex items-center justify-center gap-4 bg-gray-100 p-4 rounded-lg">
                                    <FileSpreadsheet className="w-10 h-10 text-green-500" />
                                    <span className="text-gray-700">{file.name}</span>
                                    <button onClick={removeFile} className="text-red-500 hover:text-red-700">
                                        <XCircle className="w-6 h-6" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <FileSpreadsheet className="w-12 h-12 text-gray-400" />
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
                            )}
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className={`mt-6 w-full py-2 rounded-lg transition-colors ${
                                file
                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                    : 'bg-gray-400 text-white cursor-not-allowed'
                            }`}
                        >
                            {uploading ? 'Uploading...' : 'Upload Results'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcelUploadPage;
