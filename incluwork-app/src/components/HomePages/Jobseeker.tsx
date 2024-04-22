import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobseekerHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if 'type' is not set or if it's not 'employer'
        if (localStorage.getItem('type') === null || localStorage.getItem('type') !== 'jobseeker') {
            console.log('User is not authenticated as employer. Redirecting...');
            localStorage.clear(); // Clear localStorage (remove all items)
            navigate('/unauthorized'); // Navigate user to '/unauthorized' page
        }
    }, [navigate]);

    return (
        <div>
            <h1>Jobseeker</h1>
            {/* Additional content for the EmployerHome component */}
        </div>
    );
};

export default JobseekerHome;
