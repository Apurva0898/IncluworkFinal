import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp/Signup.tsx';




function App() {
    return (
        <Router>
            <div>
                {/*<Navbar/>*/}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
