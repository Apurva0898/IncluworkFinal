import mongoose from "mongoose";
import Employer from "./Employer.js";

const challengesEnum = ['Visual Impairment', 'Hearing Impairment', 'Speech Impairment', 'Dual Sensory Impairment ', 'Vestibular Impairment', 'Paralysis', 'Arthritis', 'Down Syndrome', 'Ehlers-Danlos Syndrome', 'Orthopedic Disabilities'];
let schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        education: [
            {
                institutionName: {
                    type: String,
                    required: true,
                },
                courseName: {
                    type: String,
                    required: true,
                },
                startYear: {
                    type: Number,
                    min: 1930,
                    max: new Date().getFullYear(),
                    required: true,
                    validate: Number.isInteger,
                },
                endYear: {
                    type: Number,
                    max: new Date().getFullYear(),
                    validate: [
                        {validator: Number.isInteger, msg: "Year should be an integer"},
                        {
                            validator: function (value) {
                                return this.startYear <= value;
                            },
                            msg: "End year should be greater than or equal to Start year",
                        },
                    ],
                },
            },
        ],
        skills: [String],
        resume: {
            type: String,
        },
        medicalProof: {
            type: String,
            required: true,
        },
        challenges: {
            type: String,
            required: true,
            enum: challengesEnum,
        },
    },

    {collation: {locale: "en"},
    versionKey:false}
);

const JobSeeker = mongoose.model("JobSeeker", schema);
export default JobSeeker;
