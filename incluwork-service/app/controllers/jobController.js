import * as jobService from './../services/jobService.js';


// Update job by ID
export const updateJob = async (req, res) => {
    try {
        const job = await jobService.updateJob(req.params.id, req.body);
        res.json(job);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Delete job by ID
export const deleteJob = async (req, res) => {
    try {
        const job = await jobService.deleteJob(req.params.id);
        res.json(job);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
