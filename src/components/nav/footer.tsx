"use client";

import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Hades 2 Builder</h3>
            <p className="text-sm text-muted-foreground">
              The ultimate build planning tool for Hades 2. Plan, share, and
              optimize your builds.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dashboard?tab=builds"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Build Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard?tab=templates"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/guides"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Hezaerd/hades2builder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  GitHub
                  <Github className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8">
          <div className="flex justify-center mb-4">
            <ThemeToggle />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hades 2 Builder. Not affiliated with
            Supergiant Games. All game assets are property of their respective
            owners.
          </p>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Crafted by{" "}
            <a
              href="https://hezaerd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              Hezaerd
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
