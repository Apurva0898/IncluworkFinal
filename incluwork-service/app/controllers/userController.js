import * as userService from "../services/userService.js";
 
 
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.fetchAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving users", error: err });
    }
};
 
 
//Controller functions for job seeker profile
 
//To fetch a specific job seeker's profile
export const getJobSeekerProfile = async (req, res) => {
    console.log(req.user);
    const  id  = req.user.id;
    console.log(id);
 
    try {
        const jobSeeker = await userService.findJobSeekerById(id);
        if (!jobSeeker) {
            return res.status(404).json({ message: "Job seeker not found" });
        }
        res.json(jobSeeker);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
 
//Updating a job seeker profile
export const updateJobSeeker = async (req, res) => {
    const id = req.user.id; // Using user ID from JWT
    const updateData = req.body;
 
    try {
        const updatedJobSeeker = await userService.updateJobSeekerById(id, updateData);
        if (!updatedJobSeeker) {
            return res.status(404).json({ message: "Job seeker not found" });
        }
        res.status(200).json(updatedJobSeeker);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
 
//Deleting a job seeker profile
export const deleteJobSeeker = async (req, res) => {
    const id = req.user.id; // Using user ID from JWT
 
    try {
        const deleted = await userService.deleteJobSeekerById(id);
        if (!deleted) {
            return res.status(404).json({ message: "Job seeker not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
 
//Controller functions for employer profile
 
export const getEmployerProfile = async (req, res) => {
    try {
        // Check if the user type is employer
        if (req.user.type !== 'employer') {
            return res.status(403).send('Access denied: User is not an employer');
        }
 
        const employer = await userService.findEmployerById(req.user.id);
        if (!employer) {
            return res.status(404).send('Employer not found');
        }
        res.json(employer);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
 
export const updateEmployerProfile = async (req, res) => {
    try {
        // Check if the user type is employer
        if (req.user.type !== 'employer') {
            return res.status(403).send('Access denied: User is not an employer');
        }
 
        // Check if the email field is present in the request body
        if (req.body.email) {
            return res.status(400).send('Updating the email address is not allowed');
        }
 
        const updatedEmployer = await userService.updateEmployerProfile(req.user.id, req.body);
        res.json(updatedEmployer);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
 
export const deleteEmployerProfile = async (req, res) => {
    try {
        // Check if the user type is employer
        if (req.user.type !== 'employer') {
            return res.status(403).send('Access denied: User is not an employer');
        }
 
        await userService.deleteEmployer(req.user.id);
        res.status(204).send('Employer profile deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};