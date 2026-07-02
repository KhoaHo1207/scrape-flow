"use client";

import { Workflow } from "@/lib/generated/prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./flow-editor";
import Topbar from "./topbar/Topbar";
export default function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <ReactFlowProvider>
      <div className="flex h-full w-full flex-col overflow-hidden">
        <Topbar
          title="Workflow editor"
          subTitle={workflow.name}
          workflowId={workflow.id}
        />
        <section className="flex h-full overflow-auto">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}
