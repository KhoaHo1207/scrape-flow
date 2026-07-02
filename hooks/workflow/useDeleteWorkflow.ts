import { useMutation } from "@tanstack/react-query";
import { DeleteWorkflow } from "@/app/actions/workflows/deleteWorkflow";

export function useDeleteWorkflow() {
  return useMutation({
    mutationFn: async (id: string) => await DeleteWorkflow(id),
  });
}
