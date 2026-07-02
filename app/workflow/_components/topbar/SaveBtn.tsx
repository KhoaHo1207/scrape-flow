"use client";

import { Button } from "@/components/ui/button";
import { useUpdateWorkflow } from "@/hooks/workflow/useUpdateWorkflow";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export default function SaveBtn({ worfklowId }: { worfklowId: string }) {
  const { toObject } = useReactFlow();
  const { mutate: updateWorkflow, isPending } = useUpdateWorkflow();

  const handleSave = ({ definition }: { definition: string }) => {
    updateWorkflow(
      {
        id: worfklowId,
        definition,
      },
      {
        onSuccess: () => {
          toast.success("Workflow saved");
        },
        onError: () => {
          toast.error("Failed to save workflow");
        },
      },
    );
  };

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        handleSave({ definition: workflowDefinition });
      }}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <CheckIcon size={16} className="stroke-green-400" />
      )}
      Save
    </Button>
  );
}
