"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import { CommandMenu } from "@/components/command-menu";

export function AppShell({ children }: { children: React.ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex bg-background h-screen w-full overflow-hidden">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
            <main className="flex-1 overflow-auto bg-background transition-all duration-300 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
                <div className="relative z-10 p-8 h-full">
                    <CommandMenu />
                    {children}
                </div>
            </main>
        </div>
    );
}
