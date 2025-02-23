import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // ✅ Use named import


const Dashboard: React.FC = () => {
    const navigate = useNavigate(); // Replaces useHistory

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const decodedToken = jwtDecode<{ role: string }>(token); // ✅ Use jwtDecode instead of jwt_decode
            const userRole = decodedToken.role;

            if (userRole === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (userRole === 'STUDENT') {
                navigate('/student-dashboard');
            }
        }
    }, [navigate]);
    // Use navigate instead of history

    return <div>Loading...</div>;
};

export default Dashboard;
