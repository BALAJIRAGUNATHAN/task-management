"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <AppShell>
      <div className="flex flex-col h-full max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 text-accent-foreground text-sm font-medium border border-accent">
            <Sparkles className="size-3.5" />
            <span>NEXUS AI v1.0</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Welcome to your <br />
            AI-Enhanced Workspace
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
            Orchestrate your workflow with an intelligent environment designed for high-performance engineering.
          </p>
          <div className="flex gap-4 pt-4">
            <Button size="lg" className="rounded-full shadow-lg shadow-primary/25">
              Start Project <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-card/50 backdrop-blur-sm">
              View Documentation
            </Button>
          </div>
        </section>

        {/* Dashboard Grid Placeholder */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-card border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-10 w-10 rounded-lg bg-accent/50 mb-4 flex items-center justify-center">
                <div className="w-1/2 h-1/2 bg-foreground/20 rounded-sm" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Workspace Block {i}</h3>
              <p className="text-muted-foreground text-sm">Recent activity and shared resources.</p>
            </div>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
