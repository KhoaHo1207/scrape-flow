import { UpdateWorkflow } from "@/app/actions/workflows/updateWorkflow";
import { useMutation } from "@tanstack/react-query";

export function useUpdateWorkflow() {
  return useMutation({
    mutationFn: ({ id, definition }: { id: string; definition: string }) =>
      UpdateWorkflow({
        id,
        definition,
      }),
  });
}
