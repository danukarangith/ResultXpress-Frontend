import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Named import

interface ProtectedRouteProps {
    element: React.ReactNode;  // Use React.ReactNode for flexibility
    allowedRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRole }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode<{ role: string }>(token);  // Decode token
        const userRole = decodedToken.role;

        if (userRole !== allowedRole) {
            return <Navigate to="/login" />;
        }

        return <>{element}</>; // Render the element if role matches
    } catch (error) {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
