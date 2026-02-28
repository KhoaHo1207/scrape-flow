"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function getWorkFLowsForUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return prisma.workFlow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
