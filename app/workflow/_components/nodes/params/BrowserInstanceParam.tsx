import { TaskParam } from "@/types/task";
import React from "react";

export default function BrowserInstanceParam({
  param,
  value,
  updateNodeParamValue,
}: {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (value: string) => void;
}) {
  return <div>BrowserInstanceParam</div>;
}
