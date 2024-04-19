import  { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './../css/Login.css';



const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
            const userId = data.id;

            // Store the token, type, and user ID in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('type', type);
            localStorage.setItem('userid', userId);

            if (token && type) {
                if (type === 'employer') {
                    navigate('/employer');
                } else if (type === 'jobseeker') {
                    const userData = await getUserData(userId, token);
                    console.log('User Data:', userData);

                    if (userData && userData.resume && userData.medicalProof) {
                        navigate('/jobseeker');
                    } else {
                        navigate('/upload');
                    }
                } else {
                    navigate('/Signup');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            // Show alert for incorrect password
            setShowAlert(true);
        }
    };

    const getUserData = async (userId: string, token: string) => {
        const url = `http://localhost:3000/incluwork/jobseekers?id=${userId}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;

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
                    {showAlert && <p style={{ color: 'red' }}>Incorrect password. Please try again.</p>}
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
