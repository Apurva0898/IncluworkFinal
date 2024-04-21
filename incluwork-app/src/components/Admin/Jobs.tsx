import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { JobData } from '../../models/Job'; // Import the JobData interface

// Define the JobItem component to display individual job details
const JobItem: React.FC<{ job: JobData }> = ({ job }) => {
    return (
        <Paper style={{ padding: '16px', marginBottom: '8px' }}>
            <Typography variant="h6">Job ID: {job.jobId}</Typography>
            <Typography>Title: {job.title}</Typography>
            <Typography>Location: {job.location}</Typography>
            <Typography>Job Type: {job.jobType}</Typography>
            <Typography>Salary: ${job.salary.toLocaleString()}</Typography>
            <Typography>Date of Posting: {new Date(job.dateOfPosting).toLocaleDateString()}</Typography>
            <Typography>Date of Joining: {new Date(job.dateOfJoining).toLocaleDateString()}</Typography>
            <Typography>Max Positions: {job.maxPositions}</Typography>
            <Typography>Accepted Candidates: {job.acceptedCandidates}</Typography>
            {/* Additional details such as accessibility features and required skills */}
            <Typography>Accessibility Features: {job.accessibilityFeatures.join(', ')}</Typography>
            <Typography>Required Skills: {job.requiredSkills.join(', ')}</Typography>
        </Paper>
    );
};

// Define the main Jobs component
const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<JobData[]>([]);

    // Fetch job data from the endpoint and set the state
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/incluwork/admin/jobs', {
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFjZWM0MTU4ZmM5YmM2M2ViZGM5N2QiLCJpYXQiOjE3MTMxNzI4NTF9.o_CE-nlXYltG_8YdrADVVE-MJkEl9BCGFF6urjbuB2g`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data: JobData[] = await response.json();
                setJobs(data);
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
                    Job Listings
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                {/* Render the jobs data using the JobItem component */}
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <JobItem key={job.jobId} job={job} />
                    ))
                ) : (
                    <Typography variant="h6" style={{ textAlign: 'center' }}>
                        No jobs found
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default Jobs;
