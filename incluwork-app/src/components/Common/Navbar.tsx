import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout} from "../../store/authSlice.ts";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('type');
        setIsAuthenticated(!!token);
        setUserType(type);
    }, [location]);



    const dispatch = useDispatch();


    const handleLogout = () => {
        setIsAuthenticated(false);
        dispatch(logout())
            .unwrap()
            .then(() => {
                navigate('/login'); // Redirect to login page after logout
            })
            .catch((error: { message: any; }) => {
                console.error('Logout failed:', error.message);
            });
    };

    const renderButtons = () => {
        if (location.pathname === '/upload') {
            return null; // Do not render any buttons on the /upload page
        }

        if (!isAuthenticated) {
            // Check the current path to conditionally render the Login or Signup button
            if (location.pathname === '/signup') {
                return <Button color="inherit" component={Link} to="/login">Login</Button>;
            } else if (location.pathname === '/login') {
                return <Button color="inherit" component={Link} to="/signup">Signup</Button>;
            }
        } else {
            // Render buttons based on user type when authenticated
            switch (userType) {
                case 'admin':
                    return (
                        <>
                            <Button color="inherit" component={Link} to="/users">Users</Button>
                            <Button color="inherit" component={Link} to="/jobs">Jobs</Button>
                            <Button color="inherit" component={Link} to="/verify-profiles">Verify Profiles</Button>
                            <Button color="inherit" component={Link} to="/applications">Applications</Button>
                        </>
                    );
                case 'jobseeker':
                    return (
                        <>
                            <Button color="inherit" component={Link} to="/jobseekerhome">Home</Button>
                            <Button color="inherit" component={Link} to="/jobapplications">Applications</Button>
                            <Button color="inherit" component={Link} to="/profile">Profile</Button>
                            <Button color="inherit" component={Link} to="/feedback">Feedback</Button>
                        </>
                    );
                case 'employer':
                    return (
                        <>
                            <Button color="inherit" component={Link} to="/employer">Home</Button>
                            <Button color="inherit" component={Link} to="/create-job">Create Job</Button>
                            <Button color="inherit" component={Link} to="/view-applications">View Applications</Button>
                            <Button color="inherit" component={Link} to="/employees">Employees</Button>
                            <Button color="inherit" component={Link} to="/profile">Profile</Button>
                        </>
                    );
                default:
                    return null;
            }
        }
    };


    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My Website
                </Typography>
                {renderButtons()}
                {isAuthenticated && (
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;