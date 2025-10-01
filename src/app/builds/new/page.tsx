import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewBuildPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href="/">← Back to home</Link>
        </Button>
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Plan a New Build
      </h1>
      <p className="text-muted-foreground mt-3">
        This is a placeholder. The build planner UI will go here.
      </p>
    </main>
  );
}
