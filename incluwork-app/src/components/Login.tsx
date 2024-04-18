import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './../css/Login.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:3000/incluwork/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const token = data.token;
            const type = data.type;
            // Store the token in localStorage or session storage for future use
            localStorage.setItem('token', token);
            localStorage.setItem('type', type);

            // Redirect to the success page or any other page as needed
            navigate('/Signup');
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <div className="button-container">
                        <Button variant="outlined" color="secondary" type="submit">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
