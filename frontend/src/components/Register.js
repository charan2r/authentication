import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password
            });
            console.log('Registration Success:', res.data);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                console.log('Registration Failed:', error.response.data.message);
            } else {
                console.error('Registration Error:', error.message);
            }
        }
    };
    

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form> 
            <div>
                <p className='no-account'>Already have an account?</p>
                <button className="link-button" onClick={() => navigate('/')}>Login</button>
            </div>
        </div>
    );
}

export default Register;