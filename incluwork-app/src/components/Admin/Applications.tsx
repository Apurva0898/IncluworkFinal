import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ApplicationData } from '../../models/Application'; // Import the ApplicationData interface

// Define the ApplicationItem component to display individual application details
const ApplicationItem: React.FC<{ application: ApplicationData }> = ({ application }) => {
    return (
        <Paper style={{ padding: '16px', marginBottom: '8px' }}>
            <Typography variant="h6">Job ID: {application.jobId}</Typography>
            <Typography>User ID: {application.userId}</Typography>
            <Typography>Employer ID: {application.employerId}</Typography>
            <Typography>Application Date: {new Date(application.applicationDate).toLocaleDateString()}</Typography>
            <Typography>Status: {application.status}</Typography>
        </Paper>
    );
};

// Define the main Applications component
const Applications: React.FC = () => {
    const [applications, setApplications] = useState<ApplicationData[]>([]);

    // Fetch application data from the endpoint and set the state
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/incluwork/admin/applications', {
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFjZWM0MTU4ZmM5YmM2M2ViZGM5N2QiLCJpYXQiOjE3MTMxNzI4NTF9.o_CE-nlXYltG_8YdrADVVE-MJkEl9BCGFF6urjbuB2g`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data: ApplicationData[] = await response.json();
                setApplications(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid container justifyContent="center" style={{ padding: '20px' }}>
            <Grid item xs={12}>
                <Typography variant="h4" style={{ marginBottom: '20px' }}>
                    Applications
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                {/* Render the applications data using the ApplicationItem component */}
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <ApplicationItem key={`${application.jobId}-${application.userId}`} application={application} />
                    ))
                ) : (
                    <Typography variant="h6" style={{ textAlign: 'center' }}>
                        No applications found
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default Applications;
