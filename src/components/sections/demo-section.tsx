"use client";

import { motion } from "motion/react";
import { ThemedImage } from "@/components/themed-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

export function DemoSection() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <motion.div
            variants={fadeInUp}
            className="text-center space-y-4 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              See it in action
            </h2>
            <p className="text-lg text-muted-foreground">
              From planning to execution, every detail at your fingertips
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Choose Your Weapon
                    </h3>
                    <p className="text-muted-foreground">
                      Start by selecting your preferred weapon and aspect. Each
                      choice opens unique synergy opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Plan Your Boons
                    </h3>
                    <p className="text-muted-foreground">
                      Mix and match boons from different Olympians. Discover
                      powerful duo boons and legendary combinations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Share & Iterate
                    </h3>
                    <p className="text-muted-foreground">
                      Share your builds with the community, get feedback, and
                      refine your strategies.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={scaleIn}>
              <AspectRatio
                ratio={4 / 3}
                className="overflow-hidden rounded-2xl border-2 border-border/50 bg-muted shadow-xl"
              >
                {/*
                  PLACEHOLDER: Build creation process screenshot
                  Replace with: Screenshot of the build editor showing weapon/boon selection
                  Recommended: Show a build in progress with some boons selected
                  Dimensions: 1600x1200px (4:3 ratio)
                */}
                <ThemedImage
                  lightSrc="/images/preview-light.png"
                  darkSrc="/images/preview-dark.png"
                  alt="Build Creation Process"
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
