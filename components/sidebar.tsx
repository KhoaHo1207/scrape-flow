"use client";

import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { buttonVariants } from "./ui/button";

const routes = [
  {
    href: "",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];
export function DesktopSidebar() {
  const pathname = usePathname();

  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href),
    ) || routes[0];
  return (
    <div className="bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground relative hidden h-screen w-full max-w-[280px] min-w-[280px] border-separate overflow-hidden border-r-2 md:block">
      <div className="flex border-separate items-center justify-center gap-2 border-b p-4">
        <Logo />
      </div>

      <div className="p-2">TODO CREDIT</div>

      <div className="flex flex-col p-2">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.label}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? "sidebarActiveItem"
                  : "sidebarItem",
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
