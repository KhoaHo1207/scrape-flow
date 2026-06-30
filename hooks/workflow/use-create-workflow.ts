import { CreateWorkflow } from "@/app/actions/workflows/createWorkflow";
import { CreateWorkflowSchema } from "@/validators/workflow";
import { useMutation } from "@tanstack/react-query";

export function useCreateWorkflow() {
  return useMutation({
    mutationFn: async (data: CreateWorkflowSchema) =>
      await CreateWorkflow(data),
  });
}
