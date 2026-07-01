"use client";

import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWorkflow } from "@/hooks/workflow/useCreateWorkflow";
import {
  CreateWorkflowSchema,
  createWorkflowSchema,
} from "@/validators/workflow";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers2Icon, Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface props {
  triggerText?: string;
}

export default function CreateWorkflowDialog({ triggerText }: props) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate: createWorkflow, isPending } = useCreateWorkflow();

  const onSubmit = useCallback(
    (data: CreateWorkflowSchema) => {
      createWorkflow(data, {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          toast.success("Workflow created successfully");
        },
        onError: () => {
          toast.error("Failed to create workflow");
        },
      });
    },
    [createWorkflow, form],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />

        <div className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="name"
                      className="flex items-center gap-1"
                    >
                      Workflow Name{" "}
                      <p className="text-primary text-xs">(required)</p>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="My first workflow"
                      autoComplete="off"
                    />
                    <FieldDescription>
                      Choose a description and unique name for your workflow
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="description"
                      className="flex items-center gap-1"
                    >
                      Workflow Description{" "}
                      <p className="text-primary text-xs">(optional)</p>
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="description"
                      aria-invalid={fieldState.invalid}
                      placeholder="Describe your workflow in a few words"
                      autoComplete="off"
                      rows={3}
                      className="resize-none"
                      maxLength={80}
                    />
                    <FieldDescription>
                      Add a description to your workflow to help others
                      understand what it does
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              className="mt-4 w-full"
              disabled={form.formState.isSubmitting || isPending}
            >
              {form.formState.isSubmitting || isPending ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                "Proceed to create workflow"
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
