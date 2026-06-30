import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-primary mb-4 text-6xl font-bold">404</h1>

        <h2 className="*: mb-4 text-2xl font-semibold">Page Not Found</h2>

        <p className="text-muted-foreground mb-8 max-w-md">
          Don&apos;t worry, even the best data sometimes gets lost in the
          internet.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={"/"}
            className="bg-primary hover:bg-primary/80 flex items-center justify-center rounded-md px-4 py-2 text-white transition-colors"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <footer className="text-muted-foreground text-sm">
          If you believe this is an error, please contact our support team.
        </footer>
      </div>
    </div>
  );
}
