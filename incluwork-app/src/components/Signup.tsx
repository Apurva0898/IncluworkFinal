import React, { useState } from 'react';
import axios from 'axios';
import './../css/Login.css'

interface ISignupState {
    name: string;
    email: string;
    password: string;
    contactNumber:string;
type:string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<ISignupState>({ name: '', email: '', password: '' ,contactNumber:'',type:''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/incluwork/signup', formData);
            console.log(response.data); // Handle your response here
        } catch (error) {
            console.error('Signup error', error);
        }
    };

    return (
        <div className="loginContainer">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                /><br/>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                /><br/>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                /><br/>
                <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="+1 234 567 8901"
                    pattern="\+?\d{1,3}[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,4}"
                    title="Phone number must be in international format (e.g., +1 234 567 8901)"
                    required
                /><br/>

                <input
                    type="radio"
                    id="employer"
                    name="type"
                    value="employer"
                    checked={formData.type === "employer"}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="employer">Employer</label>

                <input
                    type="radio"
                    id="jobseeker"
                    name="type"
                    value="jobseeker"
                    checked={formData.type === "jobseeker"}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="jobseeker">Jobseeker</label><br/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
