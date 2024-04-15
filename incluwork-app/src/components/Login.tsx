import React, { useState } from 'react';
import axios from 'axios';
import './../css/Login.css'

interface ILoginState {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState<ILoginState>({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/incluwork/login', credentials);
            console.log(response.data);
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (<div className="loginContainer">
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Email"
                required
            /><br/>
            <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                required
            /><br/>
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;
