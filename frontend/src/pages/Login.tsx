import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!username.trim()) return;
        login(username.trim());
        navigate('/library');
    }

    return (
        <div className="p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Log In
                </button>
            </form>
        </div>
    );
}
