import React, { useState } from 'react';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { email, password, confirmPassword, acceptTerms, newsletter });
    };

    return (
        <div className="min-h-screen flex">
            {/* Form Section */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-semibold text-center mb-2">Create Account</h1>
                    <p className="text-center text-gray-600 mb-8">
                        Enter your details to create a new account.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Your email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="name@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                                    <a href="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>
                </span>
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                    checked={newsletter}
                                    onChange={(e) => setNewsletter(e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">
                  Subscribe me to the newsletter
                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 mb-6"
                        >
                            CREATE ACCOUNT
                        </button>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Google Login Button */}
                        <button
                            type="button"
                            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 mb-3 flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="#EA4335"
                                    d="M12 11V7h7.88c0.29 1.03 0.44 2.13 0.44 3.25 0 1.03-0.13 2.03-0.38 3H12v-3h5.91c-0.26 1.38-1.05 2.55-2.22 3.33V18h3.6c2.1-1.92 3.3-4.75 3.3-8.09 0-0.69-0.07-1.38-0.2-2.03H12z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M4.6 13.49C3.99 12.14 3.65 10.62 3.65 9s0.34-3.14 0.95-4.49l3.52 2.74C7.74 7.98 7.5 8.95 7.5 9c0 0.98 0.26 1.96 0.73 2.8l-3.63 2.69z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M12 23c2.97 0 5.47-0.99 7.3-2.67l-3.52-2.73c-1.08 0.73-2.43 1.13-3.88 1.13-2.98 0-5.48-2.01-6.38-4.74l-3.52 2.74C3.53 19.09 7.42 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M12 1c2.5 0 4.72 0.88 6.47 2.34l-3.54 2.74C14.08 5.38 13.1 5 12 5c-3.53 0-6.48 2.67-6.94 6.13L1.55 8.27C3.27 4.92 7.27 1 12 1z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
