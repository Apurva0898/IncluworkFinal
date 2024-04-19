import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate=useNavigate();
    useEffect(() => {

        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Set isAuthenticated based on token existence
    }, [location]);

    const renderButton = () => {
        if (location.pathname === '/login') {
            // Show 'Signup' button on the login page
            return (
                <Button color="inherit">
                    <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Signup
                    </Link>
                </Button>
            );
        } else if (location.pathname === '/signup') {
            // Show 'Login' button on the signup page
            return (
                <Button color="inherit">
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Login
                    </Link>
                </Button>
            );
        } else {
            // Show 'Logout' button on other pages when authenticated
            if (isAuthenticated) {
                return (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                );
            }
            // Show nothing if not authenticated on other pages
            return null;
        }
    };

    const handleLogout = () => {

        localStorage.clear();
        setIsAuthenticated(false); // Update isAuthenticated state
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My Website
                </Typography>
                {renderButton()}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
