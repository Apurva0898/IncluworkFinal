import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Common/Navbar.tsx";

const EmployerHome = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Check if 'type' is not set or if it's not 'employer'
        if (localStorage.getItem('type') === null || localStorage.getItem('type') !== 'employer') {
            console.log('User is not authenticated as employer. Redirecting...');
            localStorage.clear(); // Clear localStorage (remove all items)
            navigate('/unauthorized'); // Navigate user to '/unauthorized' page
        }
    }, [navigate]);

    return (
        <div>
            <h1>Employer</h1>
            {/* Additional content for the EmployerHome component */}
        </div>
    );
};

export default EmployerHome;
