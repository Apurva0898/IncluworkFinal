import React, { useState } from 'react';
import { TextField, Button, MenuItem, InputLabel, FormControl, Select, SelectChangeEvent } from '@mui/material';
import { useNavigate } from "react-router-dom";
import './../../css/Signup.css';

// import {findJobSeekerById,findEmployerById} from '../../../../incluwork-service/app/services/userService'

const RegisterForm = () => {

    const currentYear = new Date().getFullYear();
    const startYears = Array.from(new Array(currentYear - 1980 + 1), (_val, index) => 1980 + index).reverse();

    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [challenges, setChallenges] = useState<string[]>([]);
    const [institutionName, setInstitutionName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [endYears, setEndYears] = useState([]);
    const [skills, setSkills] = useState<string[]>([]);
    const challengesEnum = ['Visual Impairment', 'Hearing Impairment', 'Speech Impairment', 'Dual Sensory Impairment ', 'Vestibular Impairment', 'Paralysis', 'Arthritis', 'Down Syndrome', 'Ehlers-Danlos Syndrome', 'Orthopedic Disabilities'];
    const navigate = useNavigate();

    const handleStartYearChange = (event: { target: { value: any; }; }) => {
        const selectedStartYear = event.target.value;
        setStartYear(selectedStartYear);
        const updatedEndYears = Array.from(new Array(currentYear - selectedStartYear + 1), (_val, index) => selectedStartYear + index).reverse();
        // @ts-ignore
        setEndYears(updatedEndYears);
        setEndYear(''); // Reset end year if start year changes
    };
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
    const handleChangeSkill = (event: SelectChangeEvent<string | string[]>) => {
        const value = event.target.value;
        // Ensure to handle null or undefined values
        if (Array.isArray(value)) {
            // Value is an array, set it directly
            setSkills(value);
        } else {
            // Value is a string, convert it to an array
            setSkills([value]);
        }
    };

    const handleClick = () => {


        // Redirect to the desired page
        navigate('/login');
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = {
            name,
            email,
            password,
            type: "jobseeker",
            contactNumber,
            challenges,
            education: [{
                institutionName,
                courseName,
                startYear,
                endYear
            }],
            skills
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
                localStorage.setItem('token', data.token);
                localStorage.setItem('type', data.type);
                localStorage.setItem('userId', data.id);

                // Use localStorage items after they are set
                if (data.type === 'jobseeker') {
                    // Navigate to '/upload' if the user type is 'jobseeker'
                    navigate('/upload');
                } else if (data.type === 'employer') {
                    // Navigate to '/employer' if the user type is 'employer'
                    navigate('/employer');
                } else {
                    // Handle other user types or scenarios
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors appropriately (e.g., display error messages)
            });
    }


    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} action={'http'}>
                {/* Existing fields */}
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
                <FormControl fullWidth sx={{marginBottom: 2}}>
                    <InputLabel id="challenges-label">Challenges</InputLabel>
                    <Select
                        labelId="Challenges-label"
                        id="challenges"
                        multiple
                        value={challenges}
                        onChange={handleChange}
                        renderValue={(selected: string[]) => selected.join(', ')} // Use join on selected, which is an array
                    >
                        {challengesEnum.map((challenge: string) => (
                            <MenuItem key={challenge} value={challenge}>
                                {challenge}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Education fields */}
                <p className="Education">Education</p>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Institution Name"
                        onChange={e => setInstitutionName(e.target.value)}
                        value={institutionName}
                        fullWidth
                        required
                        sx={{mb: 2}}
                    />
                    <div className="course-details">
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Course Name"
                            onChange={e => setCourseName(e.target.value)}
                            value={courseName}
                            fullWidth
                            required
                            sx={{mb: 2, gridColumn: 'span 2'}} // Spanning two columns
                        />
                        <FormControl fullWidth required sx={{mb: 2, gridColumn: '3'}}>
                            <InputLabel id="start-year-label">Start Year</InputLabel>
                            <Select
                                labelId="start-year-label"
                                id="start-year-select"
                                value={startYear}
                                label="Start Year"
                                onChange={handleStartYearChange}
                            >
                                {startYears.map(year => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth required sx={{mb: 2, gridColumn: '4'}}>
                            <InputLabel id="end-year-label">End Year</InputLabel>
                            <Select
                                labelId="end-year-label"
                                id="end-year-select"
                                value={endYear}
                                label="End Year"
                                onChange={e => setEndYear(e.target.value)}
                                disabled={!startYear} // Disable until a start year is chosen
                            >
                                {endYears.map(year => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {/* Skills field */}
                    <FormControl fullWidth sx={{marginBottom: 2}}>
                        <InputLabel id="skills-label">Skills</InputLabel>
                        <Select
                            labelId="skills-label"
                            id="skills"
                            multiple
                            value={skills}
                            onChange={handleChangeSkill}
                            renderValue={(selected: string[]) => selected.join(', ')} // Use join on selected, which is an array
                        >
                            {challengesEnum.map((skill: string) => (
                                <MenuItem key={skill} value={skill}>
                                    {skill}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Submit button */}
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
