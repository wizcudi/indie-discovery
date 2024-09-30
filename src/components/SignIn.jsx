import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (error) {
            console.log('Error signing in:',error);
        }
    }
    

    return (
        <form 
            onSubmit={handleSignIn}
            className='
                flex
                flex-col
                p-10
                gap-y-4
                bg-gray-100
            '
        >
            <h1 className='text-3xl font-bold text-center'>Welcome Back</h1>
            <input 
                type="email" 
                placeholder="Email" 
                className='border border-gray-400 p-2' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                className='border border-gray-400 p-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                type='submit'
                className='
                    bg-blue-500
                    text-white
                    p-2
                    rounded-md
                    hover:bg-blue-600
                '
            >Sign In</button>
        </form>
    )
}
