import * as jobApplicationService from '../services/jobApplicationService.js';

export const createjobApplication = async (req, res) => {
    try {

        // Check if the user type is jobseeker
        if (req.user.type !== 'jobseeker') {
            return res.status(403).send({ error: "Access denied: User is not a jobseeker"});
        }
        const jobseekerid = req.user.id;
        const applicationData = req.body;
        const application = await jobApplicationService.createjobApplication(jobseekerid,applicationData);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Fetching all job applications for specific job seeker
export const getJobApplications = async (req, res) => {
    try {
        const jobseekerId = req.user.id; 
        const jobApplications = await jobApplicationService.getJobApplicationsByUserId(jobseekerId);
        res.status(200).json({ success: true, data: jobApplications });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};