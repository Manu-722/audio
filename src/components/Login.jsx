import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
 <div className="flex items-center justify-center min-h-screen bg-gray-100">
 <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
 <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
 {error && <p className="text-red-500 text-sm text-center">{error}</p>}

 <div>
 <label className="block text-gray-600 mb-1">Email</label>
 <input
 type="email"
 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
 placeholder="Enter your email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 />
 </div>

 <div>
 <label className="block text-gray-600 mb-1">Password</label>
 <input
 type="password"
 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
 placeholder="Enter your password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 </div>

 <button
 onClick={handleLogin}
 className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
 >
 Login
 </button>

 <p className="text-sm text-center text-gray-500">
 Don't have an account?{' '}
 <a href="/register" className="text-blue-600 hover:underline">
 Sign up
 </a>
 </p>
 </div>
 </div>
 );
}

export default Login;