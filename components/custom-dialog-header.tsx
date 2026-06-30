import { LucideIcon } from "lucide-react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";

interface props {
  icon?: LucideIcon;
  title?: string;
  subTitle?: string;

  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}
export default function CustomDialogHeader({
  icon: Icon,
  title,
  subTitle,
  iconClassName,
  titleClassName,
  subTitleClassName,
}: props) {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="mb-2 flex flex-col items-center gap-2">
          {Icon && (
            <Icon size={30} className={cn("stroke-primary", iconClassName)} />
          )}

          {title && (
            <p className={cn("text-primary text-xl", titleClassName)}>
              {title}
            </p>
          )}

          {subTitle && (
            <p
              className={cn("text-muted-foreground text-sm", subTitleClassName)}
            >
              {subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
    </DialogHeader>
  );
}
