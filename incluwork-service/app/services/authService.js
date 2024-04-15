// authService.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Employer from '../models/Employer.js';
import JobSeeker from '../models/JobSeeker.js';
import passport from "passport";
import { jwtSecretKey } from "../lib/authKeys.js";

const createToken = (id) => jwt.sign({ _id: id }, jwtSecretKey);

export const createUser = async (data) => {
    try {
        let user = new User({
            email: data.email,
            name: data.name,
            contactNumber: data.contactNumber,
            password: data.password,
            type: data.type,
        });

        await user.save();

        const userDetails = user.type === "employer"
            ? new Employer({
                userId: user._id,
                companyName: data.companyName,
                companyProfile: data.companyProfile,
                accommodationFacilities: data.accommodationFacilities,
            })
            : new JobSeeker({
                userId: user._id,
                education: data.education,
                skills: data.skills,
                medicalProof: data.medicalProof,
                resume: data.resume,
                challenges: data.challenges,
            });

        await userDetails.save();

        return { token: createToken(user._id), type: user.type };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                return reject(err);
            }
            if (!user) {
                return reject({ status: 401, message: info.message });
            }

            return resolve({ token: createToken(user._id), type: user.type });
        })({ body: { email, password } }); // Mock req object for passport
    });
};

