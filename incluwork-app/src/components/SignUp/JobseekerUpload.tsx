import React, {useState} from 'react';
import {Container, Grid, Paper, Typography, Button} from '@mui/material';

const JobseekerUpload: React.FC = () => {
    const [medicalFile, setMedicalFile] = useState<File | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const handleMedicalFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setMedicalFile(file);
        }
    };

    const handleResumeFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setResumeFile(file);
        }
    };

    const handleUpload = () => {
        // Handle upload logic for medicalFile and resumeFile
        if (medicalFile) {
            // Upload medicalFile to server
            console.log('Uploading medical document:', medicalFile.name);
        }
        if (resumeFile) {
            // Upload resumeFile to server
            console.log('Uploading resume:', resumeFile.name);
        }
    };

    return (
        <Container maxWidth="lg">
            <div className="upload-title">
                <Typography variant="h4" gutterBottom>
                    Upload Medical Document and Resume
                </Typography>
            </div>

            <Grid container spacing={3} className="docs-uploac">
                {/* Medical Document Upload Box */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{padding: '20px', textAlign: 'center'}}>
                        <Typography variant="h6" gutterBottom>
                            Upload Medical Document
                        </Typography>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleMedicalFileUpload}/>
                        {medicalFile && <Typography variant="body1">{medicalFile.name}</Typography>}
                    </Paper>
                </Grid>

                {/* Resume Upload Box */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{padding: '20px', textAlign: 'center'}}>
                        <Typography variant="h6" gutterBottom>
                            Upload Resume
                        </Typography>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeFileUpload}/>
                        {resumeFile && <Typography variant="body1">{resumeFile.name}</Typography>}
                    </Paper>
                </Grid>
            </Grid>

            {/* Upload Button */}
            <div className="upload-button">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!medicalFile || !resumeFile}
                    style={{marginTop: '20px'}}
                >
                    Upload
                </Button>
            </div>

        </Container>
    );
};

export default JobseekerUpload;
