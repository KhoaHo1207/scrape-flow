"use client";

import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React from "react";

export default function NodeCard({
  children,
  nodeId,
  isSelected,
}: {
  children: React.ReactNode;
  nodeId: string;
  isSelected: boolean;
}) {
  const { getNode, setCenter } = useReactFlow();
  return (
    <div
      className={cn(
        "bg-background flex w-[420px] border-separate cursor-pointer flex-col gap-1 rounded-md border-2 text-xs",
        isSelected && "border-primary",
      )}
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        const { width, height } = measured;
        const x = position.x + width / 2;
        const y = position.y + height / 2;

        if (x === undefined || y === undefined) return;
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
    >
      {children}
    </div>
  );
}
