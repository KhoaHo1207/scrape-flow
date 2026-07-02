"use client";

import { Workflow } from "@/lib/generated/prisma/client";
import { TaskType } from "@/types/task";
import { CreateFlowNode } from "@/utils/workflow/createFlowNode";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "./nodes/NodeComponent";
const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const snapFrid: [number, number] = [50, 50];
const fitViewOptions = {
  padding: 1,
};
export default function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodeChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgeChange] = useEdgesState([]);
  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgeChange}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={snapFrid}
        fitView
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Cross} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}
