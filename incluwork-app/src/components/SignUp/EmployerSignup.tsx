import React, {useState} from 'react';
import {TextField, Button, MenuItem, InputLabel, FormControl, Select, SelectChangeEvent} from '@mui/material';
import { useNavigate } from "react-router-dom";
import './../../css/Signup.css';



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
const RegisterForm = () => {
    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [companyProfile, setCompanyProfile] = useState('')
    const [accommodationFacilities, setAccommodationFacilities] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
        const value = event.target.value;
        // Ensure to handle null or undefined values
        if (Array.isArray(value)) {
            // Value is an array, set it directly
            setAccommodationFacilities(value);
        } else {
            // Value is a string, convert it to an array
            setAccommodationFacilities([value]);
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
            type:"employer",
            contactNumber,
            companyName,
            companyProfile,
            accommodationFacilities
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
                    sx={{mb: 2}}
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
                    <InputLabel id="accommodation-facilities-label">Accommodation Facilities</InputLabel>
                    <Select
                        labelId="accommodation-facilities-label"
                        id="accommodation-facilities"
                        multiple
                        value={accommodationFacilities}
                        onChange={handleChange}
                        renderValue={(selected: string[]) => selected.join(', ')} // Use join on selected, which is an array
                    >
                        {accommodationFacilitiesEnum.map((facility: string) => (
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