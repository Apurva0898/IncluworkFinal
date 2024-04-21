export interface EducationDetails {
    institutionName: string;
    courseName: string;
    startYear: number;
    endYear?: number;
}

export interface JobSeeker {
    id: string;
    userId: string;
    education: EducationDetails[];
    skills: string[];
    resume?: string;
    medicalProof?: string;
    challenges: string;
}
