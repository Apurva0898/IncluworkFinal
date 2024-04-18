import Job from './../models/Job.js';

export const createJob = async (employerId, jobData) => {
    try {
        // Include the employerId in the job data
        jobData.employerId = employerId;

        // Create the job
        const job = await Job.create(jobData);
        const response = {
            jobId: job._id, // Show _id as jobId
            ...job.toObject() // Spread the rest of the job object
        };

        // Delete the original _id field from the response
        delete response._id;

        return response;
    } catch (error) {
        throw new Error('Could not create job');
    }
}
 
// Get all job listings posted by an Employer
export const getAllJobs = async (employerId) => {
    try {
        // Fetch jobs posted by an employer
        const jobs = await Job.find({ employerId });

        if (jobs.length === 0) {
            throw new Error('No jobs found for this employer');
        }

        // Transform each job object to rename _id to jobId using the rest operator
        const jobList = jobs.map(job => ({
            jobId: job._id,
            title: job.title,
            employerId: job.employerId,
            location: job.location,
            jobType: job.jobType,
            accessibilityFeatures: job.accessibilityFeatures,
            requiredSkills: job.requiredSkills,
            maxPositions: job.maxPositions,
            acceptedCandidates: job.acceptedCandidates,
            salary: job.salary,
            dateOfJoining: job.dateOfJoining,
            dateOfPosting: job.dateOfPosting
        }));
        
        return jobList;
    } catch (error) {
        throw new Error('Could not fetch jobs');
    }
}
 
// Get job listing by Id as an Employer
export const getJobById = async (employerId, jobId) => {
    try {
        const job = await Job.findOne({ _id: jobId, employerId });

        if (!job) {
            throw new Error('Job not found');
        }

        // Modify the returned object to show _id as jobId
        const modifiedJob = {
            jobId: job._id,
            ...job.toObject() // Spread the rest of the job object
        };

        // Delete the original _id field from the modifiedJob
        delete modifiedJob._id;
        
        return modifiedJob;
    } catch (error) {
        throw new Error('Could not fetch job by jobId');
    }
}

// Update job by ID
export const updateJob = async (jobId, updateData) => {
    try {
        const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
        if (!job) {
            throw new Error('Job not found');
        }
        
        // Modify the returned object to show _id as jobId
        const modifiedJob = {
            jobId: job._id,
            ...job.toObject() // Spread the rest of the job object
        };

        // Delete the original _id field from the modifiedJob
        delete modifiedJob._id;
        return modifiedJob;
    } catch (error) {
        throw new Error('Could not update job');
    }
}

// Delete job by ID
export const deleteJob = async (jobId) => {
    try {
        const job = await Job.findByIdAndDelete(jobId);
        if (!job) {
            throw new Error('Job not found');
        }
        return job;
    } catch (error) {
        throw new Error('Could not delete job');
    }
}

// Fetch all jobs as a job seeker
export const fetchAllJobs = async () => {
    try {
        const jobs = await Job.find();

        // Transform each job object to rename _id to jobId using the rest operator
        const job = jobs.map(job => ({
            jobId: job._id,
            title: job.title,
            employerId: job.employerId,
            location: job.location,
            jobType: job.jobType,
            accessibilityFeatures: job.accessibilityFeatures,
            requiredSkills: job.requiredSkills,
            maxPositions: job.maxPositions,
            acceptedCandidates: job.acceptedCandidates,
            salary: job.salary,
            dateOfJoining: job.dateOfJoining,
            dateOfPosting: job.dateOfPosting
        }));
        
        return job;
    } catch (error) {
        throw new Error('Could not fetch jobs');
    }
}

// Fetch job by ID as a job seeker
export const fetchJobById = async (jobId) => {
    try {
        const job = await Job.findById(jobId);

        if (!job) {
            throw new Error('Job not found');
        }

        // Modify the returned object to show _id as jobId
        const modifiedJob = {
            jobId: job._id,
            ...job.toObject() // Spread the rest of the job object
        };

        // Delete the original _id field from the modifiedJob
        delete modifiedJob._id;
        
        return modifiedJob;
    } catch (error) {
        throw new Error('Could not fetch job by jobId');
    }
}