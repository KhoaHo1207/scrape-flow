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
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "./nodes/NodeComponent";
import { useEffect } from "react";
const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const snapFrid: [number, number] = [50, 50];
const fitViewOptions = {
  padding: 1,
};
export default function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodeChange] = useNodesState([]);
  const [edges, setEdges, onEdgeChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();
  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {
      console.error(error);
    }
  }, [workflow.definition, setNodes, setEdges, setViewport]);
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
