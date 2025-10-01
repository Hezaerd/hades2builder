"use client";

import type { VariantProps } from "class-variance-authority";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import type { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface DiscordAuthButtonProps {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
  callbackURL?: string;
}

export function DiscordAuthButton({
  variant = "default",
  size = "default",
  className,
  callbackURL = "/",
}: DiscordAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "discord",
        callbackURL,
      });
    } catch (error) {
      console.error("Discord login failed:", error);
      setIsLoading(false);
    }
  };

  // Always render Discord sign-in button
  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {isLoading ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Connecting...
        </>
      ) : (
        <>
          <FaDiscord
            className="mr-2 h-4 w-4"
            fill="currentColor"
            aria-hidden="true"
          />
          {"Sign in with Discord"}
        </>
      )}
    </Button>
  );
}
