import { GetWorkflowsForUser } from "@/app/actions/workflows/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/utils/helper";
import { AlertCircle, InboxIcon } from "lucide-react";
import { Suspense } from "react";

export default function WorkFlowPage() {
  return (
    <div className="h-full flex-1 flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Mange your workflows here</p>
        </div>
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}

async function UserWorkflows() {
  const workflows = await GetWorkflowsForUser();

  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="bg-accent flex size-20 items-center justify-center rounded-full">
          <InboxIcon size={40} className="stroke-primary" />
        </div>

        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet</p>
          <p className="text-muted-foreground text-sm">
            Click the button below to create your first workflow
          </p>
        </div>
      </div>
    );
  }

  return <div className="">hgieuigreigreui</div>;
}
