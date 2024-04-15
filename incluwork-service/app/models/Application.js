import mongoose from "mongoose";
import JobSeeker from './JobSeeker';


const ApplicationSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  jobId: {
    type: mongoose.Schema.Types.jobId,
    required: true,
    ref: 'Job' 
  },
  userId: {
    type: mongoose.Schema.Types.userId,
    required: true,
    ref: 'JobSeeker' 
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['pending','applied', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  }
});

const Application = mongoose.model('Application', ApplicationSchema);

export default Application;
