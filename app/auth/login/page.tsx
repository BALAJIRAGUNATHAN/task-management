'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Turnstile } from '@marsidev/react-turnstile';

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setError('Please complete the captcha');
            return;
        }
        try {
            const res = await api.post('/auth/authenticate', {
                email,
                password,
                captchaToken: token
            });
            login(res.data.token, email);
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black selection:bg-indigo-500/30">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-400">Sign in to your NEXUS account</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {/* Using Test Site Key */}
                        <Turnstile
                            siteKey="1x00000000000000000000AA"
                            onSuccess={(t) => setToken(t)}
                        />
                    </div>

                    {error && (
                        <div className="text-center text-sm text-red-500">{error}</div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        disabled={!token}
                    >
                        Sign in
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-gray-400">Don't have an account? </span>
                        <Link href="/auth/register" className="font-medium text-indigo-400 hover:text-indigo-300">
                            Sign up
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
