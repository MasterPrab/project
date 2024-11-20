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
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
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
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Telephone Number: </label>
                    <input
                        type="tel"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role: </label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterPage;