// src/register/RegisterPage.tsx
'use client'

import React, { useState } from 'react';

// Define a type for response data
interface ResponseData {
    success: boolean;
    error?: string;
    message?: string;
}

const RegisterPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [tel, setTel] = useState<string>('');
    const [role, setRole] = useState<string>('user');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://projectbackend2.vercel.app/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    tel,
                    role,
                    password,
                }),
            });

            const data: ResponseData = await response.json();
            if (data.success) {
                setMessage('User registered successfully!');
            } else {
                setMessage('Registration failed: ' + data.error);
            }
        } catch (error) {
            setMessage('An error occurred: ' + (error as Error).message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-200">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-gray-700" >Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Telephone Number: </label>
                    <input
                        type="tel"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700" >Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role: </label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div >
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterPage;