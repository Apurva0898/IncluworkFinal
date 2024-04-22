import Application from '../models/Application.js';
import Job from '../models/Job.js';
import mongoose from "mongoose";

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
            employerId: employerId,
            status:'applied' // Default status to 'applied'
        };
        
       
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
        const jobApplications = await Application.find({ userId: jobseekerId}).lean();
        
        const renamedApplications = jobApplications.map(app => {
            app.applicationId = app._id.toString(); // Convert ObjectId to string and assign to applicationId
            delete app._id; // Delete the original _id field
            return app;
        });
        
        console.log(renamedApplications);
        return renamedApplications;
    } catch (error) {
        throw new Error("Error retrieving job applications");
    }
};

// Get all applications submitted to an Employer's jobs
export const getJoblistingApplications = async (employerId) => {
    try {
        // Fetch applications submitted to jobs posted by the employer
        const applications = await Application.find({ employerId });
        
        if (applications.length === 0) {
            throw new Error('No applications found for this employer');
        }

        // Transform each application object to include necessary details
        const applicationList = applications.map(application => ({
            applicationId: application._id,
            jobId: application.jobId,
            userId: application.userId,
            applicationDate: application.applicationDate,
            status: application.status
        }));
        
        return applicationList;
    } catch (error) {
        throw new Error('Could not fetch applications');
    }
}

export const updateApplicationStatus = async (applicationId, status) => {
    try {
      const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
      return updatedApplication;
    } catch (error) {
      throw new Error('Error updating application status');
    }
  };
export const deleteJobApplication = async (applicationId) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(applicationId);
        if (!isValidObjectId) {
            throw new Error('Invalid application ID');
        }

        
        const application = await Application.findByIdAndDelete(applicationId);
        console.log(application);
        if (!application) {
            throw new Error('Application not found');
            
        }
        return application;
    } catch (error) {
        
        throw new Error('Could not delete Application');
    }
}

