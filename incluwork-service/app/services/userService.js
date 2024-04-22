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
<<<<<<< Updated upstream
=======

export const fetchAllJobs = async () => {
    try {
        const jobs = await Job.find(); // Excludes password and __v from results
        return jobs;
    } catch (err) {
        console.error("Failed to retrieve users:", err);
        throw err;
    }
};

export const getUserById = async (userId) => {
    try {
      // Fetch user by userId
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error('User not found');
      }
  
      // Convert user to plain JavaScript object and remove sensitive fields
      const userData = {
        userId: user._id, // Rename _id to userId
        name: user.name,
        email: user.email,
        type: user.type,
        contactNumber: user.contactNumber,
      };
  
      // Fetch additional data based on userType
      let additionalData;
      switch (userData.type) {
        case 'jobseeker':
          additionalData = await JobSeeker.findOne({ userId: userId });
          if (!additionalData) {
            throw new Error('JobSeeker data not found');
          }
          // Construct jobseeker data
          additionalData = {
            education: additionalData.education,
            skills: additionalData.skills,
            resume: additionalData.resume,
            medicalProof: additionalData.medicalProof,
            challenges: additionalData.challenges,
          };
          break;
        case 'employer':
          additionalData = await Employer.findOne({ userId: userId });
          if (!additionalData) {
            throw new Error('Employer data not found');
          }
          // Construct employer data
          additionalData = {
            companyName: additionalData.companyName,
            companyProfile: additionalData.companyProfile,
            inclusivityRating: additionalData.inclusivityRating,
            accommodationFacilities: additionalData.accommodationFacilities,
          };
          break;
        default:
          throw new Error('Invalid user type');
      }
  
      // Return combined user data with additional data
      return { ...userData, ...additionalData };
    } catch (error) {
      throw new Error(`Error getting user by userId: ${error.message}`);
    }
};

export const patchUserById = async (userId, data) => {
    try {
        // Fetch the user by userId
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Update basic user fields if they are in the data object
        user.name = data.name || user.name;
        user.email = data.email || user.email;
        user.contactNumber = data.contactNumber || user.contactNumber;

        // Save the updated user
        await user.save();

        // Update additional data based on userType
        let additionalDataModel;
        let additionalDataUpdates = {};

        switch (user.type) {
            case 'jobseeker':
                additionalDataModel = JobSeeker;
                if (data.education) additionalDataUpdates.education = data.education;
                if (data.skills) additionalDataUpdates.skills = data.skills;
                if (data.resume) additionalDataUpdates.resume = data.resume;
                if (data.medicalProof) additionalDataUpdates.medicalProof = data.medicalProof;
                if (data.challenges) additionalDataUpdates.challenges = data.challenges;
                if (data.status) additionalDataUpdates.status = data.status;
                break;
            case 'employer':
                additionalDataModel = Employer;
                if (data.companyName) additionalDataUpdates.companyName = data.companyName;
                if (data.companyProfile) additionalDataUpdates.companyProfile = data.companyProfile;
                if (data.inclusivityRating) additionalDataUpdates.inclusivityRating = data.inclusivityRating;
                if (data.accommodationFacilities) additionalDataUpdates.accommodationFacilities = data.accommodationFacilities;
                break;
            default:
                throw new Error('Invalid user type');
        }

        // Find and update the additional data
        const additionalData = await additionalDataModel.findOneAndUpdate({ userId: userId }, additionalDataUpdates, { new: true });

        if (!additionalData) {
            throw new Error(`${user.type} data not found`);
        }

        // Return the updated data
        return { ...user.toObject(), ...additionalData.toObject() };
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(`Error updating user by userId: ${error.message}`);
    }
};
>>>>>>> Stashed changes
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
 
 
 export const findEmployerById = async (id) => {
     try {
         // Fetch the user details
         const user = await User.findById(id);
         if (!user) {
             throw new Error('User not found');
         }
  
         // Fetch the employer details associated with this user
         const employer = await Employer.findOne({ userId: id });
         if (!employer) {
             throw new Error('Employer details not found for this user');
         }
  
         // Construct a combined object with details from both models
         return {
             id: user.id,
             name: user.name,
             email: user.email,
             contactNumber: user.contactNumber,
             companyName: employer.companyName,
             companyProfile: employer.companyProfile,
             inclusivityRating: employer.inclusivityRating,
             accommodationFacilities: employer.accommodationFacilities
         };
     } catch (error) {
         throw error; // Rethrow the error to be handled by the calling function
     }
 };
  
 export const updateEmployerProfile = async (userId, data) => {
     const userDataFields = ['name', 'contactNumber'];
     const employerDataFields = ['companyName', 'companyProfile', 'inclusivityRating', 'accommodationFacilities'];
  
     const userData = {};
     userDataFields.forEach(field => {
         if (data[field] !== undefined) userData[field] = data[field];
     });
  
     const employerData = {};
     employerDataFields.forEach(field => {
         if (data[field] !== undefined) employerData[field] = data[field];
     });
  
     if (Object.keys(userData).length > 0) {
         await User.findByIdAndUpdate(userId, userData, { new: false });
     }
  
     if (Object.keys(employerData).length > 0) {
         await Employer.findOneAndUpdate({ userId: userId }, employerData, { new: false });
     }
  
     // Fetch the latest full records to include in the response
     const updatedUser = await User.findById(userId);
     const updatedEmployer = await Employer.findOne({ userId: userId });
  
     const employerProfile = {
         id: updatedUser.id,
         name: updatedUser.name,
         contactNumber: updatedUser.contactNumber,
         companyName: updatedEmployer?.companyName,
         companyProfile: updatedEmployer?.companyProfile,
         inclusivityRating: updatedEmployer?.inclusivityRating,
         accommodationFacilities: updatedEmployer?.accommodationFacilities
     };
  
     return employerProfile;
 };
  
 export const deleteEmployer = async (id) => {
     try {
         const deletedEmployer = await Employer.findOneAndDelete({ userId: id });
         if (!deletedEmployer) {
             throw new Error('Employer not found');
         }
  
         const deletedUser = await User.findByIdAndDelete(id);
         if (!deletedUser) {
             throw new Error('User not found');
         }
     } catch (error) {
         throw error; // Rethrow the error to be handled by the caller
     }
 };
