import { useMutation } from "@tanstack/react-query";
import { DeleteWokflow } from "@/app/actions/workflows/deleteWorkflow";

export function useDeleteWorkflow() {
  return useMutation({
    mutationFn: async (id: string) => await DeleteWokflow(id),
  });
}
