import { User } from "../models/User";

const API_BASE_URL = `http://localhost:3000/incluwork`;

export const fetchUserById = async (userId: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
};
