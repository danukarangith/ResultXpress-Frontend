// src/services/authService.ts
import axios from 'axios';

export const loginUser = async (email: string, password: string): Promise<string> => {
    try {
        const response = await axios.post('http://localhost:3000/login', { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);  // Store token in localStorage
        return token;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};
