import * as employerService from '../services/adminService.js';
// import * as userService from "../services/userService.js";


export const getAllEmployers = async (req, res) => {
    console.log('1111');
        try {
            console.log('1111');
            const employers = await employerService.fetchAllEmployers();
            res.status(200).json(employers);
        } catch (error) {
            console.log('1111');
            res.status(400).json({ error: error.message });
        }
    };

    // Add other controller methods here

