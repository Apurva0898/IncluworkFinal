import mongoose from "mongoose";
import Employer from "./Employer.js";
 
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
 
const jobSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employer'
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['part-time', 'full-time']
  },
  accessibilityFeatures: {
    type: [String],
    enum: accommodationFacilitiesEnum,
    default: []
  },
  requiredSkills: {
    type: [String],
    required: true
  },
  maxPositions: {
    type: Number,
    required: true
  },
  dateOfPosting: {
    type: Date,
    default: Date.now
  },
  acceptedCandidates: {
    type: Number,
    default: 0
  },
  salary: {
    type: Number,
    required: true
  },
  dateOfJoining: {
    type: Date,
    required: true
  }
},{
  versionKey:false
});
 
const Job = mongoose.model('Job', jobSchema);
 
export default Job;
