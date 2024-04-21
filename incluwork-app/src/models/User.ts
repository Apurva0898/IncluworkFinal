export interface User {
    medicalProof: boolean;
    resume: boolean;
    id: string;
    name: string;
    email: string;
    type: UserType;
    contactNumber?: string;  // Optional based on your schema validations
}
  
export type UserType = 'employer' | 'jobseeker' | 'admin';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}
  