'use client';

import { AuthProvider } from '@/components/providers/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
}
