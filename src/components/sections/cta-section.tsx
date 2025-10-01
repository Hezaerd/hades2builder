"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CtaSection() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-primary/10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Ready to build your{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-primary bg-clip-text text-transparent">
              perfect run?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the community and start planning your builds today. It's free,
            fast, and designed for players of all skill levels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/dashboard?tab=builds">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/dashboard?tab=templates">Explore Templates</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
