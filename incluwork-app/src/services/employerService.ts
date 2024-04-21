import { Employer } from "../models/Employer.ts";

const getEmployerData = async (_userId: string, token: string): Promise<Employer | null> => {
    const url = "http://localhost:3000/incluwork/employers";

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Use the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Employer data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching Employer data:', error);
        return null;
    }
};


export default {
    getEmployerData
};
