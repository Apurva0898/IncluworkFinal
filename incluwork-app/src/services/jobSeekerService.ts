import { JobSeeker } from "../models/JobSeeker";

const BASE_URL = "http://localhost:3000/incluwork";

//Service code to get jobseeker data by id
export const getJobSeekerData = async (userId: string, token: string): Promise<JobSeeker | null> => {
    const url = `${BASE_URL}/jobseekers?id=${userId}`;

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



// Service code to fetch all jobs 
export const fetchAllJobs = async () => {
    const url = `${BASE_URL}/jobs`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch jobs');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
};

//Service code to create 
export const applyToJob = async (jobId) => {
    const url = `${BASE_URL}/jobapplications`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,  // Assuming token-based authentication is required
            },
            body: JSON.stringify({ jobId })
        });

        if (!response.ok) {
            throw new Error('Failed to apply to job');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error applying to job:', error);
        return null;  // Re-throw to handle it in the component
    }
};
export default {
    getJobSeekerData
};