import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp/Signup.tsx';
import Employer from './components/HomePages/Employer.tsx';
import Jobseeker from './components/HomePages/Jobseeker.tsx';
import Navbar from "./components/Common/Navbar.tsx";
import Unauthorized from './components/Common/Unauthorized.tsx';
import Upload from './components/SignUp/JobseekerUpload.tsx';
import CreateJob from "./components/Employer/CreateJob.tsx";





function App() {
    return (
        <Router>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/employer" element={<Employer/>}/>
                    <Route path="/jobseeker" element={<Jobseeker/>}/>
                    <Route path="/unauthorized" element={<Unauthorized/>}/>
                    <Route path="/upload" element={<Upload/>}/>
                    <Route path="/create-job" element={<CreateJob/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
