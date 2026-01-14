"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Move, ZoomIn, ZoomOut, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useAuth } from "@/components/providers/auth-provider";
import { TaskBlock } from "./task-block";

interface Block {
    id: number;
    type: string;
    content: string;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    status?: string;
    priority?: number;
    dueDate?: string;
}

export function WorkspaceCanvas({ workspaceId = 1 }: { workspaceId?: number }) {
    const constraintsRef = useRef(null);
    const { isAuthenticated } = useAuth();
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [scale, setScale] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            loadBlocks();

            // WebSocket Connection
            import('@stomp/stompjs').then(({ Client }) => {
                const client = new Client({
                    brokerURL: 'ws://localhost:8080/ws', // Hardcoded for dev, should be env based
                    onConnect: () => {
                        client.subscribe(`/topic/workspace/${workspaceId}`, (message) => {
                            const updatedBlock = JSON.parse(message.body);
                            setBlocks(prev => {
                                const index = prev.findIndex(b => b.id === updatedBlock.id);
                                if (index > -1) {
                                    const newBlocks = [...prev];
                                    newBlocks[index] = updatedBlock;
                                    return newBlocks;
                                } else {
                                    return [...prev, updatedBlock];
                                }
                            });
                        });
                    },
                });
                client.activate();

                return () => {
                    client.deactivate();
                };
            });
        }
    }, [isAuthenticated, workspaceId]);

    const loadBlocks = async () => {
        try {
            const res = await api.get(`/blocks/workspace/${workspaceId}`);
            setBlocks(res.data);
        } catch (err) {
            console.error("Failed to load blocks", err);
            // Fallback for demo if no backend sync
        }
    };

    const handleOptimize = async () => {
        setLoading(true);
        try {
            // Map blocks to Tasks (using real priority)
            const tasks = blocks.map(b => ({
                id: b.id,
                title: b.content,
                priority: b.priority || 5,
                duration: 30
            }));

            const res = await api.optimize(tasks);
            const optimizedTasks = res.data;

            // Re-arrange blocks on screen based on optimized order
            const newBlocks = blocks.map(b => {
                const index = optimizedTasks.findIndex((t: any) => t.id === b.id);
                if (index !== -1) {
                    return {
                        ...b,
                        positionX: 50,
                        positionY: 50 + (index * 180),
                        content: `${b.content} [P${optimizedTasks[index].priority}]`
                    };
                }
                return b;
            });
            setBlocks(newBlocks);

        } catch (err) {
            console.error("Optimization failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBlock = async () => {
        const newBlock = {
            type: "task", // defaulting to task for demo
            content: "New Task",
            positionX: Math.random() * 400 + 100,
            positionY: Math.random() * 400 + 100,
            width: 250,
            height: 150,
            workspaceId
        };

        // Optimistic update
        const tempId = Date.now();
        setBlocks([...blocks, { ...newBlock, id: tempId } as Block]);

        try {
            const res = await api.post('/blocks', newBlock);
            setBlocks(prev => prev.map(b => b.id === tempId ? res.data : b));
        } catch (err) {
            console.error("Failed to create block", err);
        }
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-dot-pattern">
            {/* Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-background/50 backdrop-blur-md p-1.5 rounded-full border shadow-sm">
                <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}><ZoomOut className="size-4" /></Button>
                <span className="flex items-center text-xs font-mono w-12 justify-center">{Math.round(scale * 100)}%</span>
                <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.min(2, s + 0.1))}><ZoomIn className="size-4" /></Button>
                <div className="w-px h-4 bg-border mx-1" />
                <Button variant="outline" size="sm" className="rounded-full h-8" onClick={handleOptimize} disabled={loading}>
                    <Sparkles className={cn("size-3 mr-1", loading && "animate-spin")} /> {loading ? "AI..." : "Optimize"}
                </Button>
                <Button variant="default" size="sm" className="rounded-full h-8" onClick={handleAddBlock}>
                    <Plus className="size-3 mr-1" /> Add Block
                </Button>
            </div>

            {/* Canvas Area */}
            <motion.div
                ref={constraintsRef}
                className="w-full h-full cursor-grab active:cursor-grabbing"
                style={{ scale }}
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                {blocks.map((block) => (
                    <motion.div
                        key={block.id}
                        drag
                        dragConstraints={constraintsRef}
                        dragMomentum={false}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                            "absolute p-4 rounded-xl shadow-lg backdrop-blur-sm border transition-all hover:shadow-xl hover:ring-1 hover:ring-primary/20 bg-card/90"
                        )}
                        style={{ left: block.positionX, top: block.positionY, width: block.width || 250 }}
                        onDragEnd={(e, info) => {
                            api.updateBlock(block.id, {
                                ...block,
                                positionX: block.positionX + info.offset.x,
                                positionY: block.positionY + info.offset.y
                            });
                        }}
                    >
                        <div className="flex items-center justify-between mb-2 opacity-50 text-xs uppercase tracking-wider font-bold">
                            <span>{block.type}</span>
                            <Move className="size-3 cursor-move" />
                        </div>

                        <TaskBlock
                            block={block}
                            onUpdate={(id, data) => {
                                // Optimistic
                                setBlocks(prev => prev.map(b => b.id === id ? data : b));
                                api.updateBlock(id, data);
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
