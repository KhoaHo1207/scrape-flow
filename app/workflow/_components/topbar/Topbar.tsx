"use client";

import React from "react";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import SaveBtn from "./SaveBtn";

interface props {
  title: string;
  subTitle?: string;
  workflowId: string;
}

export default function Topbar({ title, subTitle, workflowId }: props) {
  const router = useRouter();
  return (
    <header className="border-p-2 bg-background sticky top-0 z-10 flex h-[60px] w-full border-separate justify-between p-2">
      <div className="flex flex-1 gap-1">
        <TooltipWrapper content="Back">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div className="">
          <p className="truncate font-bold text-ellipsis">{title}</p>
          {subTitle && (
            <p className="text-muted-foreground truncate text-xs text-ellipsis">
              {subTitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-1">
        <SaveBtn worfklowId={workflowId} />
      </div>
    </header>
  );
}
