import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Signup() {
 const [email, setEmail] = useState('');
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const navigate = useNavigate();

 const handleSignup = async () => {
 try {
 const userCredential = await createUserWithEmailAndPassword(auth, email, password);
 await updateProfile(userCredential.user, { displayName: username });
 navigate('/login');
 } catch (e) {
 setError(e.message);
 }
 };

 return (
 <div className="flex items-center justify-center min-h-screen bg-gray-100">
 <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
 <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
 {error && <p className="text-red-500 text-sm text-center">{error}</p>}

 <div>
 <label className="block text-gray-600 mb-1">Username</label>
 <input
 type="text"
 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
 placeholder="Choose a username"
 value={username}
 onChange={(e) => setUsername(e.target.value)}
 />
 </div>

 <div>
 <label className="block text-gray-600 mb-1">Email</label>
 <input
 type="email"
 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
 placeholder="Enter your email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 />
 </div>

 <div>
 <label className="block text-gray-600 mb-1">Password</label>
 <input
 type="password"
 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
 placeholder="Create a password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 </div>

 <button
 onClick={handleSignup}
 className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
 >
 Sign Up
 </button>

 <p className="text-sm text-center text-gray-500">
 Already have an account?{' '}
 <a href="/login" className="text-green-600 hover:underline">
 Log in
 </a>
 </p>
 </div>
 </div>
 );
}

export default Signup;