import { useState } from "react";
import { Check, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TaskBlockProps {
    block: any;
    onUpdate: (id: number, data: any) => void;
}

export function TaskBlock({ block, onUpdate }: TaskBlockProps) {
    const isDone = block.status === "DONE";

    const toggleStatus = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent drag start
        onUpdate(block.id, {
            ...block,
            status: isDone ? "TODO" : "DONE"
        });
    };

    const togglePriority = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Cycle 1 -> 5 -> 1
        const newPrio = block.priority === 1 ? 5 : 1;
        onUpdate(block.id, {
            ...block,
            priority: newPrio
        });
    };

    return (
        <div className={cn(
            "flex flex-col h-full",
            isDone && "opacity-60 grayscale"
        )}>
            <div className="flex items-center justify-between mb-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-6 w-6 p-0 rounded-full border-2",
                        isDone ? "bg-green-500 border-green-500 text-white" : "border-muted-foreground"
                    )}
                    onClick={toggleStatus}
                >
                    {isDone && <Check className="size-3" />}
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-6 px-2 text-[10px] font-bold uppercase tracking-wider",
                        block.priority === 1 ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-500"
                    )}
                    onClick={togglePriority}
                >
                    {block.priority === 1 ? "High Priority" : "Low Priority"}
                </Button>
            </div>

            <div
                className={cn("flex-1 text-sm font-medium outline-none", isDone && "line-through")}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdate(block.id, { ...block, content: e.currentTarget.textContent })}
            >
                {block.content}
            </div>

            {block.dueDate && (
                <div className="flex items-center text-[10px] text-muted-foreground mt-2">
                    <Calendar className="size-3 mr-1" />
                    {new Date(block.dueDate).toLocaleDateString()}
                </div>
            )}
        </div>
    );
}
