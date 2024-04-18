import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp/Signup.tsx';
import Employer from './components/HomePages/Employer.tsx';
import Jobseeker from './components/HomePages/Jobseeker.tsx';
import Unauthorized from './components/Common/Unauthorized.tsx'





function App() {
    return (
        <Router>
            <div>
                {/*<Navbar/>*/}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/employer" element={<Employer/>}/>
                    <Route path="/jobseeker" element={<Jobseeker/>}/>
                    <Route path="/unauthorized" element={<Unauthorized/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
