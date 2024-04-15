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
