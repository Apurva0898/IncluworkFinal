import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Container } from '@mui/material';

// Define the TypeScript interfaces for the types of data we expect to handle
interface EducationDetail {
    institutionName: string;
    courseName: string;
    startYear: number;
    endYear: number;
    _id: string;
}

interface JobSeeker {
    userId: string;
    name: string;
    email: string;
    type: string;
    contactNumber: string;
    id: string;
    education: EducationDetail[];
    skills: string[];
    resume: string;
    medicalProof: string;
    challenges: string[];
    status: string;
}

// Component to display individual job seeker details in a card
const JobSeekerCard: React.FC<{ jobseeker: JobSeeker, onUpdate: () => void }> = ({ jobseeker, onUpdate }) => {
    const handleStatusChange = async (status: string) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/incluwork/users/${jobseeker.userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: status })
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            await response.json();
            onUpdate(); // Call the onUpdate callback to trigger a refresh in the parent component
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    return (
        <Card style={{ display: 'flex', justifyContent: 'space-between', margin: 8, width: '100%' }}>
            <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h5">{jobseeker.name}</Typography>
                <Typography color="textSecondary">{jobseeker.email}</Typography>
                <Typography color="textSecondary">{jobseeker.contactNumber}</Typography>
                <Typography>Skills: {jobseeker.skills.join(', ')}</Typography>
                <Typography>Challenges: {jobseeker.challenges.join(', ')}</Typography>
            </CardContent>
            <Grid container direction="column" style={{ padding: 16 }} alignItems="flex-end">
                <Button color="primary" onClick={() => handleStatusChange('verified')} style={{ marginBottom: 8 }}>Accept</Button>
                <Button color="secondary" onClick={() => handleStatusChange('incomplete')}>Deny</Button>
            </Grid>
        </Card>
    );
};
// Component to manage the list of job seekers
const JobSeekersList: React.FC = () => {
    const [jobseekers, setJobseekers] = useState<JobSeeker[]>([]);
    const [refresh, setRefresh] = useState(false); // Used to trigger re-fetching

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/incluwork/admin/getUsers?type=jobseeker', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error("Failed to fetch");
                return;
            }

            const data = await response.json();
            const filteredJobseekers = data.filter(user => user.status?.toLowerCase() === 'pending');
            setJobseekers(filteredJobseekers);
        };

        fetchData();
    }, [refresh]); // Dependency on refresh to re-trigger the effect

    const handleUpdate = () => {
        setRefresh(!refresh); // Toggle the refresh state to re-fetch data
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                {jobseekers.map(jobseeker => (
                    <Grid item xs={12} key={jobseeker.id}>
                        <JobSeekerCard jobseeker={jobseeker} onUpdate={handleUpdate} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
export default JobSeekersList;
