import Employer from "../models/Employer.js";
import User from "../models/User.js";
import JobSeeker from "../models/JobSeeker.js";

// Service functions for Employer model

export const fetchAllEmployers = async () => {
    try {
        // console.log('1111');
        const employers = await Employer.find();
        return employers;
    } catch (error) {
        throw new Error(`Failed to retrieve employers: ${error.message}`);
    }
};

export const fetchAllUsers = async () => {
    try {
        // You might want to filter out sensitive fields
        const users = await User.find({}, '-password -__v'); // Excludes password and __v from results
        return users;
    } catch (err) {
        console.error("Failed to retrieve users:", err);
        throw err;
    }
};

// Other service functions can be defined similarly using export const
