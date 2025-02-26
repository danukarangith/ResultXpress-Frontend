import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import Swal from 'sweetalert2';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    const navigate = useNavigate();



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);

            const token = response.data.token;
            const decodedToken = JSON.parse(atob(token.split('.')[1]));

            if (decodedToken.role === 'ADMIN') {
                Swal.fire({
                    title: 'Welcome, Admin!',
                    text: 'You have successfully logged in.',
                    icon: 'success',
                    confirmButtonText: 'Go to Dashboard',
                }).then(() => {
                    navigate('/admin-dashboard');
                });
            } else {
                Swal.fire({
                    title: 'Welcome, Student!',
                    text: 'You have successfully logged in.',
                    icon: 'success',
                    confirmButtonText: 'Go to Dashboard',
                }).then(() => {
                    navigate('/student-dashboard');
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Login Failed',
                text: 'Invalid email or password.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 bg-white">
                <div className="max-w-md w-full">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome back</h2>
                    <p className="text-gray-600 mb-8">Please enter your details to sign in</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign in
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up now
                        </a>
                    </p>
                </div>
            </div>

            {/* Right side - Background Image/Pattern */}
            <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600">
                <div className="h-full flex items-center justify-center p-12">
                    <div className="max-w-lg">
                        <h1 className="text-4xl font-bold text-white mb-6">Welcome to Our Platform</h1>
                        <p className="text-white/90 text-lg">
                            Sign in to access your account and explore all our features.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;