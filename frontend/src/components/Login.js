import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            console.log('Login Success:', res.data);
            navigate('/home'); 
        } catch (error) {
            if (error.response && error.response.data) {
                console.log('Login Failed:', error.response.data.message);
            } else {
                console.error('Login Error:', error.message);
            }
        }
    };

    const handlenavRegister = () => {
        navigate('/register');
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>

            </form>
            <div className="register-prompt">
                <p className="no-account">No account?</p>
                <button className='link-button' onClick={handlenavRegister}>Register</button>
            </div>
           
        </div>
    );
};

export default Login;
