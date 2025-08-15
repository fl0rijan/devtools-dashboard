import {createContext, useContext, useState, type ReactNode, useEffect} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {loginUser, registerUser, logoutUser, getCurrentUser} from "../services/api.js";

interface User {
    username: string;
    email?: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    register: (email: string, username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getCurrentUser();
                if (data.isAuthenticated) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Failed to fetch current user", err);
                setUser(null);
            }
        }

        fetchUser();
    }, []);

    const login = async (username: string, password: string) => {
        const data = await loginUser(username, password);
        setUser(data.user);
        return data;
    };

    const register = async (email: string, username: string, password: string) => {
        const data = await registerUser(email, username, password);
        return data;
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
