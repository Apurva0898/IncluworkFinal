import React, {useState} from 'react';
import {TextField, Button, MenuItem, InputLabel, FormControl, Select, SelectChangeEvent} from '@mui/material';
import { useNavigate } from "react-router-dom";
import './../../css/Signup.css';



const challengesEnum = ['Visual Impairment', 'Hearing Impairment', 'Speech Impairment', 'Dual Sensory Impairment ', 'Vestibular Impairment', 'Paralysis', 'Arthritis', 'Down Syndrome', 'Ehlers-Danlos Syndrome', 'Orthopedic Disabilities'];
const RegisterForm = () => {
    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [companyProfile, setCompanyProfile] = useState('')
    const [challenges, setChallenges] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
        const value = event.target.value;
        // Ensure to handle null or undefined values
        if (Array.isArray(value)) {
            // Value is an array, set it directly
            setChallenges(value);
        } else {
            // Value is a string, convert it to an array
            setChallenges([value]);
        }
    };
    const handleClick = () => {
        const navigate = useNavigate();

        // Redirect to the desired page
        navigate('/../success');
    };
    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = {
            name,
            email,
            password,
            type:"jobseeker",
            contactNumber,
            companyName,
            companyProfile,
            challenges
        };

        fetch('http://localhost:3000/incluwork/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        const navigate = useNavigate();

        // Redirect to the desired page
        navigate('/../success');
    }


    return (
        <React.Fragment>
            <h2>Employer Register Form</h2>
            <form onSubmit={handleSubmit} action={'http'}>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    fullWidth
                    required
                    sx={{mb: 2}}
                />
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 2}}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{mb: 2}}
                />
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Contact Number"
                    onChange={e => setContactNumber(e.target.value)}
                    value={contactNumber}
                    required
                    fullWidth
                    sx={{mb: 2}}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Company Name"
                    onChange={e => setCompanyName(e.target.value)}
                    value={companyName}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Company Profile"
                    onChange={e => setCompanyProfile(e.target.value)}
                    value={companyProfile}
                    required
                    fullWidth
                    sx={{mb: 2}}
                />
                <FormControl fullWidth sx={{marginBottom: 2}}>
                    <InputLabel id="challenges-facilities-label">Challenges</InputLabel>
                    <Select
                        labelId="challenges-label"
                        id="challenges"
                        multiple
                        value={challenges}
                        onChange={handleChange}
                        renderValue={(selected: string[]) => selected.join(', ')} // Use join on selected, which is an array
                    >
                        {challengesEnum.map((facility: string) => (
                            <MenuItem key={facility} value={facility}>
                                {facility}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="button-container">
                    <Button variant="outlined" color="secondary" type="submit">Register</Button>
                    <p>Already have an account? Click login</p>
                    <Button onClick={handleClick} variant="outlined" color="secondary">LOGIN</Button>
                </div>
            </form>


        </React.Fragment>
    )
}

export default RegisterForm;