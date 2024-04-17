
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

    try{

         // Fetch the associated user information
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found'); 
    }
    
    //Fetch job seeker associated with the user
    const jobSeeker = await JobSeeker.findOne({ userId: id });
    if (!jobSeeker ) {
        throw new Error('Profile not found for this user'); // Ensures that the job seeker's user ID matches the ID from the token
    }
    

    // Combining the information into a single object at the same level
    const combinedUserDetails = {
        id: user.id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        type: user.type,
        education: jobSeeker.education.map(edu => ({
            institutionName: edu.institutionName,
            courseName: edu.courseName,
            startYear: edu.startYear,
            endYear: edu.endYear
        })),
        skills: jobSeeker.skills,
        resume: jobSeeker.resume,
        medicalProof: jobSeeker.medicalProof,
        challenges: jobSeeker.challenges
    };

      return combinedUserDetails;

    } catch (error) {
        throw error; // Rethrow the error to be handled by the calling function
    }
   
};

 
// Updating job seeker profile
 export const updateJobSeekerProfile = async (id, updateData) => {
    const userDataFields = ['name', 'contactNumber'];  // Fields that belong to the User model
    const jobSeekerDataFields = ['education', 'skills', 'resume', 'medicalProof', 'challenges'];  // Fields that belong to the JobSeeker model
    
    const userData = {};
    userDataFields.forEach(field => {
        if (updateData[field] !== undefined) userData[field] = updateData[field];
    });

    const jobSeekerData = {};
    jobSeekerDataFields.forEach(field => {
        if (updateData[field] !== undefined) jobSeekerData[field] = updateData[field];
    });

    // Update User if there's any user data to update
    if (Object.keys(userData).length > 0) {
        await User.findByIdAndUpdate(id, userData, { new: true });
    }

    // Update JobSeeker if there's any job seeker data to update
    let updatedJobSeeker = null;
    if (Object.keys(jobSeekerData).length > 0) {
        updatedJobSeeker = await JobSeeker.findOneAndUpdate({ userId: id }, jobSeekerData, { new: true });
    }

    // Fetch the latest full records to include in the response
    const updatedUser = await User.findById(id);

    // Merge updated information
    const jobSeekerProfile = {
        id: updatedUser.id,
        name: updatedUser.name,
        contactNumber: updatedUser.contactNumber,
        education: updatedJobSeeker?.education,
        skills: updatedJobSeeker?.skills,
        resume: updatedJobSeeker?.resume,
        medicalProof: updatedJobSeeker?.medicalProof,
        challenges: updatedJobSeeker?.challenges
    };

    return jobSeekerProfile;

};
 
// Deleting a job seeker profile
export const deleteJobSeeker = async (id) => {
    try {
        const deletedJobSeeker = await JobSeeker.findOneAndDelete({ userId: id});
        if (!deletedJobSeeker) {
            throw new Error('Job seeker not found');
        }

        // Deleting the user associated with the job seeker
        // If you choose to delete the User record as well:
        
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        
    } catch (error) {
        throw error; // Rethrow the error to be handled by the caller
    }
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
