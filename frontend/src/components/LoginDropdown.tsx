import React, {useState} from 'react';
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/react';

interface LoginDropdownProps {
    onLogin: (email: string, password: string) => void;
}

export function LoginDropdown({onLogin}: LoginDropdownProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onLogin(username, password);
    }

    return (
        <Popover className="relative">
            <PopoverButton className="px-3 py-2 text-gray-700 hover:text-white hover:bg-blue-600 font-semibold rounded-md transition">
                Login
            </PopoverButton>

            <PopoverPanel
                className="absolute right-0 mt-2 w-64 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="login-username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="login-username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700 transition font-semibold"
                    >
                        Log In
                    </button>
                </form>
            </PopoverPanel>
        </Popover>
    );
}
