"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;

  iconClassname?: string;
  titleClassname?: string;
  subTitleClassname?: string;
}
export default function CustomDialogHeader(props: Props) {
  const Icon = props.icon;
  return (
    <>
      <DialogHeader>
        <DialogTitle asChild>
          <div className="flex flex-col items-center gap-2 mb-2">
            {Icon && (
              <Icon
                size={30}
                className={cn("stroke-primary", props.iconClassname)}
              />
            )}
            {props.title && (
              <p className={cn("text-xl text-primary", props.titleClassname)}>
                {props.title}
              </p>
            )}
            {props.subTitle && (
              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  props.subTitleClassname
                )}
              >
                {props.subTitle}
              </p>
            )}
          </div>
        </DialogTitle>
      </DialogHeader>
    </>
  );
}
