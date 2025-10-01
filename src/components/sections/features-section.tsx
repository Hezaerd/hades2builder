"use client";

import { Brain, Share2, Shield, Sparkles, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";

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

// Feature data
const features = [
  {
    icon: Brain,
    title: "Smart Theorycrafting",
    description:
      "Plan and optimize builds with intelligent suggestions. Discover synergies and powerful combinations you might have missed.",
  },
  {
    icon: Shield,
    title: "Complete Database",
    description:
      "Access every weapon, boon, upgrade, and aspect in Hades 2. Always up-to-date with the latest game patches.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description:
      "Share your builds with a single link, export to images, or as files.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with modern tech for instant loading and smooth interactions. No waiting, just building.",
  },
  {
    icon: Users,
    title: "No account required",
    description:
      "No account required to use the website. Almost all features are available without an account.",
  },
  {
    icon: Sparkles,
    title: "Beautiful Interface",
    description: "Gorgeous, intuitive design that works on any device.",
  },
];

export function FeaturesSection() {
  return (
    <section className="min-h-screen flex items-center bg-muted/30">
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
              Everything you need to{" "}
              <span className="text-primary">optimize your runs</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed for theorycrafters, speedrunners, and
              casual players alike
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
