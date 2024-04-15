import User from "../models/User.js";
import JobSeeker from "../models/JobSeeker.js";

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
 // Rest API implementations for job seeker profile

// Fetching a job seeker profile
export const findJobSeekerById = async (id) => {
    const jobSeeker = await JobSeeker.findOne({ userId: id });
    if (!jobSeeker ) {
        return null;  // Ensures that the job seeker's user ID matches the ID from the token
    }
    // Fetch the associated user information
    const user = await User.findById(id);
    if (!user) {
        return null;  // Optionally handle this differently if user should always exist
    }

    // Combine the information into a single object at the same level
    const combinedDetails = {
        ...jobSeeker.toObject(),  // Convert MongoDB model to a plain object
        name: user.name,           // Directly adding user fields to the top level
        email: user.email,
        contactNumber: user.contactNumber,
        type: user.type
    };

    // Remove  redundant or sensitive fields 
    delete combinedDetails.userId;  
    delete combinedDetails.__v;  // Remove version key
    delete combinedDetails.userId;  // Optional: Remove if you don't want to expose this


    return combinedDetails;

};
 
// Updating job seeker profile
 export const updateJobSeekerById = async (id, updateData) => {
     return await JobSeeker.findByIdAndUpdate(id, updateData, { new: true });
 };
 
// Deleting a job seeker profile
 export const deleteJobSeekerById = async (id) => {
     return await JobSeeker.findByIdAndDelete(id);
 };
 
 
