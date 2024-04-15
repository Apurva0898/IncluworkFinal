import mongoose from "mongoose";

const accommodationFacilitiesEnum = [
    'Screen Reading Software',
    'Magnification Tools',
    'Braille Display',
    'Large Print Materials',
    'Tactile Markings',
    'Auditory Cues',
    'Sign Language Interpreter',
    'Video Relay Services',
    'Closed Captioning',
    'Vibrating Devices',
    'Text-based Communication Tools',
    'Speech Recognition Software',
    'Alternative Communication Devices',
    'Haptic Communication Methods',
    'Assistive Technology Devices',
    'Ergonomic Equipment',
    'Adjustable Workstations',
    'Adaptive Technology Devices',
    'Accessible Workspaces',
    'Ergonomic Chairs',
    'Adaptive Equipment',
    'Visual Schedules',
    'Task Checklists',
    'Supportive Seating',
    'Adjustable Equipment',
    'Wheelchair Accessible Workspace',
    'Ergonomic Keyboards',
];

const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        companyProfile: {
            type: String,
        },
        inclusivityRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        accommodationFacilities: {
            type: [String],
            enum: accommodationFacilitiesEnum,
        }
    },
    { collation: { locale: "en" } ,
    versionKey:false},
);

const Employer = mongoose.model("Employer", schema);

export default Employer;
