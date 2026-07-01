"use client";

import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkflow } from "@/hooks/workflow/useDeleteWorkflow";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}

export default function DeleteWorkflowDialog({
  open,
  setOpen,
  workflowName,
  workflowId,
}: props) {
  const [confirmText, setConfirmText] = useState("");

  const { mutate: deleteWorkflow, isPending } = useDeleteWorkflow();

  const onSubmit = useCallback(() => {
    deleteWorkflow(workflowId, {
      onSuccess: () => {
        setOpen(false);
        setConfirmText("");
        toast.success("Workflow deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete workflow");
      },
    });
  }, [deleteWorkflow, setOpen, workflowId]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDescription>
            If you delete this workflow, it will not be able to recover it.
            <div className="flex flex-col gap-2 py-4">
              <p>
                If you are sure, enter{" "}
                <b className="text-primary">{workflowName}</b> to confirm
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName || isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onSubmit}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
