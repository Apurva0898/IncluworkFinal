import User from "../models/User.js";
import JobSeeker from "../models/JobSeeker.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import Employer from "../models/Employer.js";


export const getAllUsers = async (type) => {
    try {
        const query = type ? { type: type } : {};
        const users = await User.find(query);
        if (!users.length) {
            throw new Error('No users found');
        }

        const usersWithData = await Promise.all(users.map(async (user) => {
            const userData = {
                userId: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                contactNumber: user.contactNumber,
            };

            let additionalData = {};
            switch (userData.type) {
                case 'jobseeker':
                    additionalData = await JobSeeker.findOne({ userId: userData.userId });
                    additionalData = additionalData ? {
                        id: additionalData._id,
                        education: additionalData.education,
                        skills: additionalData.skills,
                        resume: additionalData.resume,
                        medicalProof: additionalData.medicalProof,
                        challenges: additionalData.challenges,
                        status:additionalData.status
                    } : {};
                    break;
                case 'employer':
                    additionalData = await Employer.findOne({ userId: userData.userId });
                    additionalData = additionalData ? {
                        companyName: additionalData.companyName,
                        companyProfile: additionalData.companyProfile,
                        inclusivityRating: additionalData.inclusivityRating,
                        accommodationFacilities: additionalData.accommodationFacilities,
                    } : {};
                    break;
                default:
                    console.log('Invalid user type for user:', userData.userId);
                    additionalData = {}; // Skip processing for invalid types
            }

            return { ...userData, ...additionalData };
        }));

        return usersWithData;
    } catch (error) {
        console.error('Error getting all users:', error);
        throw new Error(`Error getting all users: ${error.message}`);
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

//get all jobs for admin
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

//get all application dor admin
export const getAllApplications = async () => {
    try {
        const applications = await Application.find();
        return applications;
    } catch (error) {
        throw new Error(`Failed to retrieve applications: ${error.message}`);
    }
};


//Controller function for deleting all applications
export const removeAllApplications = async (req: Request, res: Response) => {
    try {
        const result = await deleteAllApplications();
        res.json({
            message: 'All applications have been deleted',
            result
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete applications: ${error.message}` });
    }
};


export const verifyJobseeker = async (userId,status) => {
    try {
        console.log("in admin service")
         const js=await  JobSeeker.findOne(userId);
        const updatedJobSeeker = await JobSeeker.findOneAndUpdate(
            { userId },
            {
                status: status // Update status to pending after the upload
            },
        );
        return js ;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to set the status: ${error.message}`);
    }
};

//updating
export const updateJob = async (jobId, jobData) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, { new: true });
        if (!updatedJob) {
            throw new Error(`Job not found with ID: ${jobId}`);
        }
        return updatedJob;
    } catch (error) {
        throw new Error(`Failed to update job: ${error.message}`);
    }
};

//updating application

export const updateApplication = async (applicationId, applicationData) => {
    try {
        const updatedApplication = await Application.findByIdAndUpdate(applicationId, applicationData, { new: true });
        if (!updatedApplication) {
            throw new Error(`Application not found with ID: ${applicationId}`);
        }
        return updatedApplication;
    } catch (error) {
        throw new Error(`Failed to update application: ${error.message}`);
    }
};

//updating jobseker
export const updateJobSeeker = async (jobSeekerId, jobSeekerData) => {
    try {
        const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(jobSeekerId, jobSeekerData, { new: true });
        if (!updatedJobSeeker) {
            throw new Error(`Job seeker not found with ID: ${jobSeekerId}`);
        }
        return updatedJobSeeker;
    } catch (error) {
        throw new Error(`Failed to update job seeker: ${error.message}`);
    }
};

//updating employer
export const updateEmployer = async (employerId, employerData) => {
    try {
        const updatedEmployer = await Employer.findByIdAndUpdate(employerId, employerData, { new: true });
        if (!updatedEmployer) {
            throw new Error(`Employer not found with ID: ${employerId}`);
        }
        return updatedEmployer;
    } catch (error) {
        throw new Error(`Failed to update employer: ${error.message}`);
    }
};

//updating user
export const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
            throw new Error(`User not found with ID: ${userId}`);
        }
        return updatedUser;
    } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};