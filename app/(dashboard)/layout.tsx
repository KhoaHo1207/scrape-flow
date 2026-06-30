import React from "react";
import BreadCrumbHeader from "@/components/breadcrumb";
import { DesktopSidebar } from "@/components/sidebar";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { Separator } from "@/components/ui/separator";

import { UserButton, Show } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="container flex h-[50px] items-center justify-between px-6 py-4">
          <BreadCrumbHeader />
          <div className="flex items-center gap-1">
            <ModeToggle />

            <Show when={"signed-in"}>
              <UserButton />
            </Show>
          </div>
        </header>

        <Separator />

        <div className="overflow-auto">
          <div className="text-accent-foreground container flex-1 p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
