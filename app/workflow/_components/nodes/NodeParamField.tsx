"use client";

import { AppNodeData } from "@/types/appNode";
import { TaskParam, TaskParamType } from "@/types/task";
import { useNodesData, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import StringParam from "./params/StringParam";

export default function NodeParamField({
  param,
  nodeId,
}: {
  param: TaskParam;
  nodeId: string;
}) {
  const { updateNodeData } = useReactFlow();
  const node = useNodesData(nodeId);
  const inputs = (node?.data as AppNodeData | undefined)?.inputs;
  const value = inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...inputs,
          [param.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, param.name, inputs],
  );
  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value ?? ""}
          updateNodeParamValue={updateNodeParamValue}
        />
      );

    default:
      return (
        <div className="w-full">
          <p className="text-muted-foreground text-xs">Not Implemented</p>
        </div>
      );
  }
}
