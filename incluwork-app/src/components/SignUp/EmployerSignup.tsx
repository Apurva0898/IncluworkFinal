import React, {useState} from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Chip,
    Box
  } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {signup} from './../../store/authSlice';
import './../../css/Signup.css';




const EmployerSignup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const  [email, setEmail] = useState('');
    const  [password, setPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyProfile, setCompanyProfile] = useState('');
    const [accommodationFacilities, setAccommodationFacilities] = useState<string[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const accommodationFacilitiesEnum: string[] = [
        'Screen reading software', 'Magnification tools', 'Audio Navigation Guides','Braille Display',
        'Tactile Markings', 'Assistive Listening Devices', 'Captioning Software', 'Accessible Communication Tools',
        'Sign Language Interpreters', 'Visual Cues and Graphical Representation Software', 'Visual Communication Aids',
        'Speech Generating Devices', 'Text-to-Speech Software', 'Communication Applications', 'Assistive Technology Devices',
        'Tactile Graphics Software', 'Remote Collaboration Tools', 'Ergonomic Workspace Setup', 'Collaborative Project Management Tools',
        'Accessible Communication Platforms', 'Visual Cues for Orientation', 'Accessible Software Development Tools',
        'Accessible Transportation Facilities', 'Flexible Attendance Policies', 'Ergonomic Workstation Setup',
        'Voice-controlled Technology Devices', 'Assistive Aids', 'Flexible Work Arrangements', 'Voice-controlled Project Management Tools',
        'Supportive Workstations and Equipment', 'Virtual Assistive Devices', 'Individualized Support Plans',
        'Wheelchair Accessible Workspace', 'Customized Work Arrangements', 'Supportive Networks and Communities',
        'Collaborative Task Management Tools', 'Ergonomic Keyboards', 'Rest Areas and Quiet Workspaces', 'Telecommuting Facilities', 'Individualized Accommodative Facilities'
    ];

    const handleChange = (value: string) => {
        const currentIndex = accommodationFacilities.indexOf(value);
        const newChecked = [...accommodationFacilities];
 
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setAccommodationFacilities(newChecked);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {
            name,
            email,
            password,
            type: 'employer',
            contactNumber,
            companyName,
            companyProfile,
            accommodationFacilities,
        };

        dispatch(signup(formData)).unwrap()
            .then(response => {
                console.log('Registration successful:', response);
                navigate('/employer'); // Redirect on success
            })
            .catch(error => {
                console.error('Registration failed:', error);
                // Handle error appropriately
            });
    };

    return (
        <div className="signup-form">
            <h1>Employer Signup</h1>
            <form onSubmit={handleSubmit}>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
                <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
                <TextField label="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} fullWidth margin="normal" />
                <TextField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} fullWidth margin="normal" />
                <TextField label="Company Profile" value={companyProfile} onChange={(e) => setCompanyProfile(e.target.value)} fullWidth margin="normal" />
                  {/* Button and Chip display */}
                  <div style={{ marginBottom: '16px' }}>
                    <Button onClick={() => setDialogOpen(true)} variant="outlined" color="secondary" fullWidth>
                        Choose Accommodation Facilities
                    </Button>
                </div>
                <Box display="flex" flexWrap="wrap" gap={1} marginBottom={2}>
                    {accommodationFacilities.map(facility => (
                        <Chip key={facility} label={facility} onDelete={() => handleChange(facility)} />
                    ))}
                </Box>
               
                {/* Dialog for selection */}
                <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
                    <DialogTitle>Accommodation Facilities</DialogTitle>
                    <List>
                        {accommodationFacilitiesEnum.map(facility => (
                            <ListItem
                                key={facility}
                                dense
                                button
                                onClick={() => handleChange(facility)}
                            >
                                <Checkbox
                                    edge="start"
                                    checked={accommodationFacilities.indexOf(facility) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={facility} />
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
                {/* Submit and navigation buttons */}
                <div className="button-container">
                    <Button variant="outlined" color="secondary" type="submit">Register</Button>
                    <p>Already have an account? Click login</p>
                    <Button onClick={() => navigate('/login')} variant="outlined" color="secondary">LOGIN</Button>
                </div>
            </form>
        </div>
    );
};

export default EmployerSignup;




