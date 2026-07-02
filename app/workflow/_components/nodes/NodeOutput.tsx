import React from "react";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { ColorForHandle } from "./common";

export function NodeOutputs({ children }: { children: React.ReactNode }) {
  return <div className="devide-y flex flex-col gap-1">{children}</div>;
}

export function NodeOutput({ output }: { output: TaskParam }) {
  return (
    <div className="bg-secondary relative flex justify-end p-3">
      <p className="text-muted-foreground text-xs">{output.name}</p>

      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-background !-right-2 !h-4 !w-4 !border-2",
          ColorForHandle[output.type],
        )}
      />
    </div>
  );
}
