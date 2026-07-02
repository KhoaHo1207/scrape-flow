import prisma from "@/lib/prisma";
import { waitFor } from "@/utils/helper";
import { auth } from "@clerk/nextjs/server";
import Editor from "../../_components/editor";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const { workflowId } = await params;
  const { userId } = await auth();

  if (!userId) return <div>Unauthenticated</div>;

  await waitFor(5000);

  const workflow = await prisma.workflow.findFirst({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) return <div>Workflow not found</div>;

  return <Editor workflow={workflow} />;
}
