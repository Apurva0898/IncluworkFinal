import * as adminService from "../services/adminService.js";
import * as userService from "../services/userService.js";


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

    // Add other controller methods here

