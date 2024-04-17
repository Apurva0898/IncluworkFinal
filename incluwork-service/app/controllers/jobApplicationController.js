import * as jobApplicationService from '../services/jobApplicationService.js';

export const createjobApplication = async (req, res) => {
    try {

        // Check if the user type is employer
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

