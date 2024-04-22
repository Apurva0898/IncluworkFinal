import { Employer } from "../models/Employer.ts";


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

export const updateApplicationStatus = async (applicationId: string, status: string) => {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) {
        throw new Error('Failed to update application status');
    }
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
