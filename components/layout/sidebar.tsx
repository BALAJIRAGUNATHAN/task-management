"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Calendar,
    Settings,
    ChevronRight,
    Search,
    Plus,
    Compass,
    MessageSquare,
    History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface SidebarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

export function Sidebar({ isCollapsed, toggleCollapse }: SidebarProps) {
    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/" },
        { icon: Compass, label: "Explore", href: "/explore" },
        { icon: Calendar, label: "Schedule", href: "/schedule" },
        { icon: MessageSquare, label: "Messages", href: "/messages" },
        { icon: History, label: "History", href: "/history" },
    ];

    return (
        <motion.div
            initial={{ width: isCollapsed ? 80 : 256 }}
            animate={{ width: isCollapsed ? 80 : 256 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
                "relative h-screen border-r border-sidebar-border bg-sidebar/80 backdrop-blur-md text-sidebar-foreground flex flex-col p-4",
                "transition-all duration-300 ease-in-out z-50"
            )}
        >
            {/* Branding Area */}
            <div className="flex items-center justify-between mb-8 h-10">
                <motion.div
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className={cn("flex items-center gap-2 font-bold text-xl overflow-hidden whitespace-nowrap", isCollapsed && "hidden")}
                >
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <span>NEXUS</span>
                </motion.div>

                {isCollapsed && (
                    <div className="w-full flex justify-center">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                        </div>
                    </div>
                )}
            </div>

            {/* Action Button */}
            <div className="mb-6">
                <Button
                    variant="outline"
                    className={cn("w-full justify-start gap-2 bg-sidebar-accent/50 hover:bg-sidebar-accent border-sidebar-border shadow-none", isCollapsed ? "px-2 justify-center" : "px-4")}
                >
                    {isCollapsed ? <Plus className="size-5" /> : (
                        <>
                            <Plus className="size-4" />
                            <span>New Page</span>
                        </>
                    )}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 p-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all group",
                            isCollapsed ? "justify-center" : ""
                        )}
                        title={isCollapsed ? item.label : ""}
                    >
                        <item.icon className="size-5 shrink-0" />
                        {!isCollapsed && (
                            <span className="text-sm font-medium">{item.label}</span>
                        )}
                    </a>
                ))}
            </nav>

            {/* Quick Search */}
            <div className={cn("mb-2", isCollapsed ? "flex justify-center" : "")}>
                <button className={cn("flex items-center gap-2 w-full p-2 text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors", isCollapsed ? "justify-center rounded-lg hover:bg-sidebar-accent" : "")}>
                    <Search className="size-5" />
                    {!isCollapsed && <span className="text-sm">Search...</span>}
                </button>
            </div>


            {/* Footer / Settings */}
            <div className="pt-4 border-t border-sidebar-border mt-auto flex items-center justify-between gap-2">
                <button className={cn("flex items-center gap-3 p-2 w-full rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all", isCollapsed ? "justify-center" : "")}>
                    <Settings className="size-5 shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
                </button>
                {!isCollapsed && <ThemeToggle />}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={toggleCollapse}
                className="absolute -right-3 top-9 p-1 rounded-full bg-sidebar border border-sidebar-border text-sidebar-foreground/60 hover:text-sidebar-foreground shadow-sm z-50 transition-colors"
            >
                <ChevronRight className={cn("size-4 transition-transform", !isCollapsed && "rotate-180")} />
            </button>

        </motion.div>
    );
}
