import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Import the stylesheet

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />

        <button onClick={handleLogin}>Login</button>

        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;