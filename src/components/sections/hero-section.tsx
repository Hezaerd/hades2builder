"use client";

import { ArrowRight, Sparkles, Star, Users } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { ThemedImage } from "@/components/themed-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,oklch(0.7_0.15_250)_0%,transparent_50%)] opacity-10 dark:opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <Badge
                variant="secondary"
                className="mb-4 px-4 py-1.5 text-sm font-medium"
              >
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                Build Your Legend
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block">Hades 2</span>
                <span className="block bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to bg-clip-text text-transparent">
                  Build Planner
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                Master the art of theorycrafting. Plan, optimize, and share
                devastating builds. Combine weapons setups, charmes, and boons
                to dominate your next run through the world of Hades II.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="text-base group">
                <Link href="/dashboard?tab=builds">
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base group"
              >
                <Link href="https://discord.gg/CG6CJRkcdm" target="_blank">
                  Join the community{" "}
                  <FaDiscord className="h-4 w-4 transition-transform group-hover:rotate-[360deg] duration-500" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Join 10,000+ builders</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span>Highly rated</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Preview Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-gradient-from/20 to-gradient-to/20 rounded-2xl blur-2xl" />

              <AspectRatio
                ratio={16 / 10}
                className="overflow-hidden rounded-2xl border-2 border-border/50 bg-muted shadow-2xl relative z-10"
              >
                {/*
                  PLACEHOLDER: Main dashboard/build planner preview
                  Replace with: Screenshot showing the main build planner interface
                  Recommended: Capture with some example boons/weapons selected
                  Dimensions: 1920x1200px (16:10 ratio)
                */}
                <ThemedImage
                  lightSrc="/images/preview-light.png"
                  darkSrc="/images/preview-dark.png"
                  alt="Hades 2 Build Planner Interface Preview"
                  fill
                  className="object-cover"
                  priority
                />
              </AspectRatio>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
