import Job from './../models/Job.js';


// Update job by ID
export const updateJob = async (jobId, updateData) => {
    try {
        const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
        if (!job) {
            throw new Error('Job not found');
        }
        return job;
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
