import * as adminService from "../services/adminService.js";
import * as userService from "../services/userService.js";
import * as jobService from '../services/jobService.js';
import * as applicationService from '../services/jobApplicationService.js';



export const getAllEmployers = async (req, res) => {
        try {
            const employers = await adminService.fetchAllEmployers();
            res.status(200).json(employers);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };


export const getAllUsers = async (req, res) => {
        try {
            const users = await userService.fetchAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: "Error retrieving users", error: err });
        }
    };    


export const getAllJobs = async (req, res) => {
        try {
            const jobs = await adminService.getAllJobs();
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };    

   

    export const getAllApplications = async (req, res) => {
        try {
            const applications = await adminService.getAllApplications();
            res.status(200).json(applications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };    

