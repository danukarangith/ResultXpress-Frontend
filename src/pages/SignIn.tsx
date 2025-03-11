import {useState, useEffect, JSX} from 'react';
import {Lock, Mail, Key, ChevronLeft, ChevronRight, LogIn,  EyeOff, Eye} from 'lucide-react';
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


interface CarouselImage {
    url: string;
    title: string;
    description: string;
}

export default function EnhancedLoginPage(): JSX.Element {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error,] = useState<string>('');
    const [isLoading, ] = useState<boolean>(false);
    const navigate = useNavigate();


    const [fadeIn, setFadeIn] = useState<boolean>(false);

    // Carousel state
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    // Carousel images
    const carouselImages: CarouselImage[] = [
        {
            url: "src/assets/pexels-buro-millennial-636760-1438072.jpg",
            title: "Welcome to our Platform",
            description: "Sign in to unlock a world of possibilities and innovation."
        },
        {
            url: "src/assets/pexels-mikhail-nilov-6981004.jpg",
            title: "Secure & Reliable",
            description: "Your data is protected with state-of-the-art encryption and security protocols."
        },
        {
            url: "src/assets/pexels-olly-3762800.jpg",
            title: "24/7 Support",
            description: "Our team is always available to help you with any questions or concerns."
        }
    ];
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



    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };


    const nextSlide = (): void => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    };

    const prevSlide = (): void => {
        setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
    };

    const goToSlide = (index: number): void => {
        setCurrentSlide(index);
    };


    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
        <div className={`w-screen h-screen flex overflow-hidden transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            {/* Background gradient that covers entire screen */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 z-0"></div>

            {/* Glass container for login form */}
            <div className="relative z-10 flex w-full h-full">
                {/* Left side - Image Carousel */}
                <div className="hidden lg:block lg:w-3/5 h-full relative overflow-hidden">
                    {/* Carousel slides */}
                    <div className="absolute inset-0">
                        {carouselImages.map((image, index: number) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${image.url})`,
                                        backgroundBlendMode: 'overlay'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
                                <div className="relative h-full flex items-center justify-start pl-16 pr-8">
                                    <div className="max-w-lg">
                                        <h1 className="text-5xl font-bold text-white mb-6">{image.title}</h1>
                                        <p className="text-white/90 text-xl">
                                            {image.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel controls */}
                    <div className="absolute bottom-16 left-16 z-10 flex items-center space-x-3">
                        <button
                            onClick={prevSlide}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-colors"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        {carouselImages.map((_, index: number) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}

                        <button
                            onClick={nextSlide}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-colors"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Right side - Login Form */}
                <div className="w-full lg:w-2/5 h-full flex items-center justify-center px-6">
                    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-12 border border-white/20">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Key className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
                            <p className="text-white/70 mt-2">Sign in to your account to continue</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-white/80">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-white/50" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-medium text-white/80">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-white/50" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center "
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-white text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white/30 rounded bg-white/10"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white/80">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm font-medium text-indigo-300 hover:text-indigo-200 transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <LogIn className="h-5 w-5 mr-2" />
                                )}
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>

                            <div className="relative py-3">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-transparent text-white/60">Or continue with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/*<p className="mt-6 text-center text-sm text-white/70">*/}
                        {/*    Don't have an account?{' '}*/}
                        {/*    <a href="#" className="font-medium text-indigo-300 hover:text-indigo-200 inline-flex items-center transition-colors">*/}
                        {/*        <UserPlus className="h-4 w-4 mr-1" />*/}
                        {/*        Create an account*/}
                        {/*    </a>*/}
                        {/*</p>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}