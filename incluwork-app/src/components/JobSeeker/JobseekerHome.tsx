import React, { useState, useEffect } from 'react';
import { JobData } from '../../models/Job';
import { fetchAllJobs , applyToJob} from './../../services/jobSeekerService'; // Make sure this path matches the location of your service function
import { Card, CardContent, Typography, Grid, Chip ,Button,Box} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './../../css/JobCards.css'



const JobCards: React.FC = () => {
    const [jobs, setJobs] = useState<JobData[]>([]);  // Use the imported JobData type for state
    const [appliedJobIds, setAppliedJobIds] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadJobs = async () => {
            setLoading(true);
            try {
                
                const jobsFetched = await fetchAllJobs();  // Renamed to avoid shadowing
                console.log("Jobs fetched:", jobsFetched); 
                setJobs(jobsFetched);
            } catch (error) {
                setError('Failed to fetch jobs');
                console.error(error);
            }
            setLoading(false);
        };

        loadJobs();
    },[]);

    // For apply button click to create a job application
    const handleApply = async (jobId) => {
        
        try {
            const result = await applyToJob(jobId);
            console.log('Application Result:', result);
            setAppliedJobIds(new Set([...appliedJobIds, jobId])); // Update the set of applied job IDs
            alert('Applied successfully!'); // Alert or handle UI update
        } catch (error) {
            console.error('Failed to apply:', error);
            alert('Failed to apply.'); // Alert or handle UI update
        }
    };
    return (
         // Adjusted padding for centering
         <div style={{ padding: '20px 10%' }}>
         {loading && <div>Loading jobs...</div>}
         {error && <div>{error}</div>}
         <Grid container spacing={4} justifyContent="center">
             {jobs.map((job) => (
                 <Grid item key={job.jobId} xs={12}>
                     <Card raised style={{ maxWidth: 800, margin: 'auto' }}>
                         <CardContent>
                             <Typography variant="h5" component="h2">{job.title}</Typography>
                             <Typography color="textSecondary" gutterBottom>{job.location} - {job.jobType}</Typography>
                             <Typography variant="body2" color="textSecondary">Salary: ${job.salary.toLocaleString()}</Typography>
                             <Typography variant="body2" color="textSecondary">
                                 Positions Available: {job.maxPositions}
                             </Typography>
                             <Typography variant="body2" component="p">
                                 Skills Required:
                                 {job.requiredSkills.map((skill, index) => (
                                     <Chip key={index} label={skill} color="primary" size="small" />
                                 ))}
                             </Typography>
                             <Typography variant="body2" component="p">
                                 Accessibility Features:
                                 {job.accessibilityFeatures.map((feature, index) => (
                                     <Chip key={index} label={feature} size="small" />
                                 ))}
                             </Typography>
                         </CardContent>
                         <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                             {appliedJobIds.has(job.jobId) ? (
                                 <Chip label="Applied" color="success" style={{ backgroundColor: 'green', color: 'white', borderRadius: '20px' }} />
                             ) : (
                                 <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={() => handleApply(job.jobId)}>
                                     Apply
                                 </Button>
                             )}
                         </Box>
                     </Card>
                 </Grid>
             ))}
         </Grid>
     </div>
 );
};
    

export default JobCards;