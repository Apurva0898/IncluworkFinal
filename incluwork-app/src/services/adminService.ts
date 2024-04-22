import {JobSeeker} from "../models/JobSeeker.ts";

const baseUrl='http://localhost:3000/incluwork'
export const updateJobSeekerProfileStatus=async (userId: string, status: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${baseUrl}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: status})
        });

        if (!response.ok) {
            throw new Error('Failed to update status');
        }

        await response.json();
    } catch (error) {
        console.error('Error updating user status:', error);
    }
};

export const fetchJobSeekersByType = async (type: string): Promise<JobSeeker[]> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${baseUrl}/admin/getUsers?type=${type}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.error("Failed to fetch jobseekers");
        throw new Error('Failed to fetch jobseekers');
    }

    const data = await response.json();
    return data.filter((user: JobSeeker) => user.status?.toLowerCase() === 'pending');
};
