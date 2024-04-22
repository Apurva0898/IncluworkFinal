import React, { useEffect, useState } from "react";
import {
  fetchApplications,
  updateApplicationStatus,
  fetchUserById,
  fetchAllJobs,
  downloadResume,
  downloadMedicalProof
} from '../../services/employerService.ts';
import { ApplicationData } from "../../models/Application";
import { JobData } from "../../models/Job";
import { User } from "../../models/User";

import { FaDownload, FaCheck, FaTimes } from "react-icons/fa"; // Importing icons

interface ApplicationWithDetails extends ApplicationData {
    userName: string;
    jobTitle: string;
    resumeURL: string;
    medicalProofURL: string;
}

const JobApplications: React.FC = () => {
    const [applications, setApplications] = useState<ApplicationWithDetails[]>([]);
    const [updateCount, setUpdateCount] = useState(0); // State to trigger useEffect after updating status

    useEffect(() => {
        const loadData = async () => {
            try {
                const jobs: JobData[] = await fetchAllJobs();
                const applicationData: ApplicationData[] = await fetchApplications();
                const applicationsWithDetails = await Promise.all(applicationData.map(async app => {
                    const user: User = await fetchUserById(app.userId);
                    const job = jobs.find(j => j.jobId === app.jobId);
                    return {
                        ...app,
                        userName: user.name,
                        jobTitle: job ? job.title : "No Job Title",
                        resumeURL: user.resume,
                        medicalProofURL: user.medicalProof
                    };
                }));
                setApplications(applicationsWithDetails);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        loadData();
    }, [updateCount]); // Depend on updateCount to refresh data on status update

    const handleStatusUpdate = async (applicationId: string, newStatus: 'accepted' | 'rejected') => {
        try {
            const response = await updateApplicationStatus(applicationId, newStatus);
            if (response) {
                setUpdateCount(count => count + 1); // Increment updateCount to trigger data refresh
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    return (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {applications.map((app) => (
                <div key={app.applicationId} style={{ 
                    border: '1px solid #ccc', 
                    padding: '20px', 
                    width: 'calc(50% - 10px)', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>  
                    <div style={{ flexGrow: 1 }}>
                        <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '25px' }}>Applicant: {app.userName}</span>
                            <div style={{ 
                                padding: '6px 12px', 
                                backgroundColor: app.status === 'accepted' ? 'green' : app.status === 'rejected' ? 'red' : 'none',
                                color: 'white', 
                                borderRadius: '5px',
                                display: app.status === 'pending' ? 'none' : 'inline-block',
                                fontSize: '14px'  // Keeping the font size standard for status indicators
                            }}>
                                {app.status.toUpperCase()}
                            </div>
                        </h3>
                        <p>Job Title: {app.jobTitle}</p>
                        <p>Application Date: {new Date(app.applicationDate).toLocaleDateString()}</p>
                        <div>
                            <button onClick={() => downloadResume(app.resumeURL)} style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}>
                                <FaDownload /> Download Resume
                            </button>
                            <button onClick={() => downloadMedicalProof(app.medicalProofURL)} style={{ backgroundColor: 'blue', color: 'white' }}>
                                <FaDownload /> Download Medical Proof
                            </button>
                        </div>
                    </div>
                    <div>
                        {app.status === 'pending' || app.status === 'applied' ? (
                            <div style={{ display: 'flex' }}>
                                <button onClick={() => handleStatusUpdate(app.applicationId, 'accepted')} style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '10px' }}>
                                    <FaCheck /> Accept
                                </button>  
                                <button onClick={() => handleStatusUpdate(app.applicationId, 'rejected')} style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
                                    <FaTimes /> Reject
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobApplications;
