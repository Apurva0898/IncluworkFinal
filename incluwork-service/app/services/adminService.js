import Employer from "../models/Employer.js";
import User from "../models/User.js";
import JobSeeker from "../models/JobSeeker.js";
import Job from "../models/Job.js";


// Service functions for Employer model

export const fetchAllEmployers = async () => {
    try {
        const employers = await Employer.find();
        return employers;
    } catch (error) {
        throw new Error(`Failed to retrieve employers: ${error.message}`);
    }
};

export const fetchAllUsers = async () => {
    try {
        // You might want to filter out sensitive fields
        const users = await User.find({}, '-password -__v'); // Excludes password and __v from results
        return users;
    } catch (err) {
        console.error("Failed to retrieve users:", err);
        throw err;
    }
};

export const getAllJobs = async () => {
    try {
        // Retrieve all jobs from the database
        const jobs = await Job.find();

        // Map over the retrieved jobs and transform each job object
        const transformedJobs = jobs.map(job => {
            // Destructure the job object to extract relevant properties
            const { _id, ...rest } = job.toObject();

            // Return a new object with "jobId" instead of "_id"
            return { jobId: _id, ...rest };
        });
        
        // Return the transformed jobs
        return transformedJobs;
    } catch (error) {
        // If an error occurs, throw an error message
        throw new Error(`Failed to retrieve jobs: ${error.message}`);
    }
};




