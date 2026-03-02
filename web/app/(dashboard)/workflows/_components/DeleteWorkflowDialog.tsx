"use client";

import { DeleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}
export default function DeleteWorkflowDialog(props: Props) {
  const [confirmText, setConfirmText] = useState("");

  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", {
        id: "delete-workflow",
      });
    },
    onError: () => {
      toast.error("Failed to delete workflow", {
        id: "delete-workflow",
      });
    },
  });
  return (
    <AlertDialog open={props.open} onOpenChange={props.setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4 text-muted-foreground text-sm">
              <p>
                If you delete this workflow, you will not be able to recover it.
              </p>
              <div className="flex flex-col py-4 gap-2">
                <p>
                  If you are sure, enter{" "}
                  <b className="font-bold text-destructive">
                    {props.workflowName}
                  </b>{" "}
                  to confirm:
                </p>
                <Input
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            // className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={
              confirmText !== props.workflowName || deleteMutation.isPending
            }
            onClick={(e) => {
              e.stopPropagation();
              toast.loading("Deleting workflow...", { id: "delete-workflow" });
              deleteMutation.mutate(props.workflowId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
