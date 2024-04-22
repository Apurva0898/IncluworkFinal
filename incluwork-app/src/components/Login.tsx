// src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { login } from '../store/authSlice'; 
import '../css/Login.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isLoading, isSuccess, message } = useSelector((state: AppState) => state.auth);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (isSuccess && user) {
            // Logic to handle navigation based on user type and jobseeker's data
            if (user.type === 'jobseeker' && user.resume && user.medicalProof) {
                navigate('/jobseeker');
            } else if (user.type === 'jobseeker') {
                navigate('/upload');
            } else {
                navigate(`/${user.type}`);
            }
        } else if (isError) {
            console.error('Login Error:', message);
        }
        else{
            localStorage.clear();
        }
    }, [user, isSuccess, isError, navigate, message]);

    return (
        <div className="login-page">
            <div className="overview-container">
                <h1>IncluWork</h1>
                <p>
                    <strong>Project Overview:</strong>
                    <br />
                    "IncluWork" is an innovative platform aimed at promoting workplace inclusivity and accessibility.
                    Our project focuses on empowering employers and employees alike by providing tools and resources to
                    create inclusive work environments for individuals with diverse needs and abilities.
                </p>
                <h2>Key Features:</h2>
                <ul>
                    <li>Accommodation Tools</li>
                    <li>Employer Profiles</li>
                    <li>Employee Registration</li>
                    <li>Interactive Dashboard</li>
                    <li>Educational Resources</li>
                </ul>
            </div>
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="email"
                        variant="outlined"
                        color="secondary"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        color="secondary"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    {isError && <p style={{ color: 'red' }}>Login Error: {message}</p>}
                    <div className="button-container">
                        <Button variant="outlined" color="secondary" type="submit" disabled={isLoading}>
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
