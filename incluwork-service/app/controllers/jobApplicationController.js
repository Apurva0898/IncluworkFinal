import * as jobApplicationService from '../services/jobApplicationService.js';

export const createjobApplication = async (req, res) => {
    try {
        const jobseekerid = req.user.id;
        const applicationData = req.body;
        const application = await jobApplicationService.createjobApplication(jobseekerid,applicationData);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

