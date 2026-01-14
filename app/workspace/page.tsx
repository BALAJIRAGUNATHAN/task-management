import { WorkspaceCanvas } from "@/components/workspace/canvas";

export default function WorkspacePage() {
    return (
        <div className="h-full w-full rounded-2xl overflow-hidden border border-sidebar-border shadow-sm">
            <WorkspaceCanvas />
        </div>
    );
}
