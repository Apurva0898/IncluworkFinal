import Application from '../models/Application.js';
import Job from '../models/Job.js';

export const createjobApplication = async (jobseekerid,applicationData) => {
    try {
         // Check if the job ID is valid by looking it up in the database
         if (!applicationData.jobId) {
            throw new Error('Job ID must be provided.');
        }

        const jobExists = await Job.findById(applicationData.jobId);
        if (!jobExists) {
            throw new Error('Job ID is invalid or does not exist.');
        }
        
        const employerId= jobExists.employerId;
        // Merge the jobseekerId with the other application data
        const fullApplicationData = {
            ...applicationData,
            userId: jobseekerid,  // Setting the userId field
            employerId: employerId
        };
        
        console.log(fullApplicationData);
        // Create a new application directly
        const savedApplication = await Application.create(fullApplicationData);

        // Rename _id to applicationId in the response
        const { _id, ...application } = savedApplication.toObject();
        const renamedApplication = { jobapplicationId: _id,...application  };

        return renamedApplication;
    } catch (error) {
        throw new Error('Error creating the application: ' + error.message);
    }
};

// Getting job applications for the particular job seeker
export const getJobApplicationsByUserId = async (jobseekerId) => {
    try {
        // Find all job applications where the userId matches the logged-in user's ID
        const jobApplications = await Application.find({ userId: jobseekerId});
        return jobApplications;
    } catch (error) {
        throw new Error("Error retrieving job applications");
    }
};


