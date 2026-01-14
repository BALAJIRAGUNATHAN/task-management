'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface User {
    email: string;
    fullName?: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string, email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = getCookie('token');
        // In a real app, you'd validate the token with the backend /me endpoint here
        // For now, we'll just check if it exists and decode it or assume valid
        if (token) {
            // Decode JWT logic could go here to get email
            setIsLoading(false);
            // Temporary: we don't have user info from just token easily without decoding
            // or an endpoint. We'll set a dummy user or fetch profile later.
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = (token: string, email: string) => {
        setCookie('token', token, { maxAge: 60 * 60 * 24 }); // 1 day
        setUser({ email });
        router.push('/workspace');
    };

    const logout = () => {
        deleteCookie('token');
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!getCookie('token'),
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
