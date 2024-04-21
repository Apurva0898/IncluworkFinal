import { JobSeeker } from "../models/JobSeeker";

const getJobSeekerData = async (userId: string, token: string): Promise<JobSeeker | null> => {
    const url = `http://localhost:3000/incluwork/jobseekers?id=${userId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch jobseeker data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching jobseeker data:', error);
        return null;
    }
};

export default {
    getJobSeekerData
};
