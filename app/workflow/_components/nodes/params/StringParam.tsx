"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskParam } from "@/types/task";
import { useId, useState } from "react";

export default function StringParam({
  param,
  value,
  updateNodeParamValue,
}: {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (value: string) => void;
}) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();
  return (
    <div className="w-full space-y-1 p-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.required && <p className="text-red-400">*</p>}
      </Label>
      <Input
        id={id}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={() => updateNodeParamValue(internalValue)}
        placeholder="Enter value here..."
        className="text-xs"
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}
