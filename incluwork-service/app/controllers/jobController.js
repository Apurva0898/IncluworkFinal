import * as jobService from './../services/jobService.js';

// Create a new job
export const createJob = async (req, res) => {
    try {
        // Check if the user type is employer
        if (req.user.type !== 'employer') {
            return res.status(403).send({ error: "Access denied: User is not an employer"});
        }

        const employerId = req.user.id;

        const job = await jobService.createJob(employerId, req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
 
// Get all jobs
export const getAllJobs = async (req, res) => {
    try {
        // Check if the user type is employer
        if (req.user.type !== 'employer') {
            return res.status(403).send({ error: "Access denied: User is not an employer"});
        }

        const jobs = await jobService.getAllJobs();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
 
// Get job by ID
export const getJobById = async (req, res) => {
    try {
        // Check if the user type is employer
        if (req.user.type !== 'employer') {
            return res.status(403).send({ error: "Access denied: User is not an employer"});
        }

        const job = await jobService.getJobById(req.params.id);
        
        res.json(job);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Update job by ID
export const updateJob = async (req, res) => {
    try {
        // Check if the user type is employer
        if (req.user.type !== 'employer') {
            return res.status(403).send({ error: "Access denied: User is not an employer"});
        }

        const job = await jobService.updateJob(req.params.id, req.body);
        res.json(job);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Delete job by ID
export const deleteJob = async (req, res) => {
    try {
        // Check if the user type is employer
        if (req.user.type !== 'employer') {
            return res.status(403).send({ error: "Access denied: User is not an employer"});
        }
        
        await jobService.deleteJob(req.params.id);
        return res.status(204).send(); 
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
