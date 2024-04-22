import { Employer } from "../models/Employer.ts";
import {User} from "../models/User.ts";
import {Job} from "../components/HomePages/Employer.tsx";


const API_BASE_URL = `http://localhost:3000/incluwork`;

export const getEmployerData = async (_userId: string, token: string): Promise<Employer | null> => {
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

export const fetchApplications = async () => {
    const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch applications');
    }
    console.log(response);
    return response.json();
};



// Fetch all jobs
export const fetchAllJobs = async () => {
    const response = await fetch(`${API_BASE_URL}/joblistings`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch job listings');
    }

    return response.json();
};

export const downloadFile = async (fileUrl: string, fileName: string): Promise<void> => {
    console.log(`url == ${API_BASE_URL}${fileUrl}`);
    const response = await fetch(`${API_BASE_URL}${fileUrl}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to download file');
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName); // Set the file name for download
    document.body.appendChild(link);
    link.click();
    link.parentNode!.removeChild(link); // Clean up
    window.URL.revokeObjectURL(downloadUrl); // Free up memory
};

export const downloadResume = (resumeURL: string): Promise<void> => {
    return downloadFile(`${resumeURL}`, 'Resume.pdf');
};

export const downloadMedicalProof = (medicalProofURL: string): Promise<void> => {
    return downloadFile(`${medicalProofURL}`, 'MedicalProof.pdf');
}

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


// Function to create a job listing
export const createJobListing = async (formData: any): Promise<void> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/joblistings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Failed to create job');

        await response.json();  // Assuming we might need the response data for something
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;  // Re-throw the error to handle it further up the call stack
    }
};

export const deleteJobListing = async (jobId: string): Promise<void> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/joblistings/${jobId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete job');
        }

        await response.json();
    } catch (error) {
        console.error('Error deleting job:', error);
        throw error; // Re-throw the error to handle it further up the call stack
    }
};

export const fetchjobs = async (): Promise<Job[]> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch(`${API_BASE_URL}/joblistings`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch jobs');
    }

    return await response.json() as Promise<Job[]>;
};

export const updateJob = async (currentJob: Job | null) => {
    if (!currentJob) return;
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/joblistings/${currentJob.jobId}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(currentJob)
        });

        if (!response.ok) {
            throw new Error('Failed to update job');
        }

        const updatedJob = await response.json() as Job;
        return updatedJob;
    } catch (error) {
        console.error('Error updating job:', error);
    }
};