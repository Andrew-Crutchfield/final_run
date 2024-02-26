import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST } from '../services/fetcher';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await POST('/api/login', { email, password });

      if (response) {
        navigate('/booklisting');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await POST('/api/register', { email, password });

      if (response) {
        navigate('/booklisting');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      <h1>Login/Register</h1>
      <label>Email: </label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Home;