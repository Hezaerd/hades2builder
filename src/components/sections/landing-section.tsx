import Link from "next/link";
import { ThemedImage } from "@/components/themed-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

export function LandingSection() {
  return (
    <section className="grid grid-cols-3 items-center gap-10 md:gap-16">
      <div className="space-y-5 col-span-1">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Hades 2 Build Planner
        </h1>
        <p className="text-muted-foreground text-lg">
          Plan, theorycraft, and share powerful builds. Mix weapons, boons, and
          upgrades to forge your perfect run.
        </p>
      </div>

      <div className="flex flex-col gap-6 col-span-2">
        <div className="flex flex-col gap-6 px-12">
          <AspectRatio
            ratio={16 / 9}
            className="overflow-hidden rounded-xl border bg-muted"
          >
            <ThemedImage
              lightSrc="/images/preview-light.png"
              darkSrc="/images/preview-dark.png"
              alt="Preview"
              fill
              className="object-cover"
            />
          </AspectRatio>

          <Button asChild size="lg">
            <Link href="/dashboard?tab=builds">Plan a new build</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
