"use client";

import { motion, type Variants } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";

type ThemedImageProps = Omit<ComponentProps<typeof Image>, "src"> & {
  lightSrc: string | StaticImageData;
  darkSrc: string | StaticImageData;
  animationIn?: Variants;
  animationOut?: Variants;
};

export function ThemedImage({
  lightSrc,
  darkSrc,
  animationIn,
  animationOut,
  ...props
}: ThemedImageProps) {
  const { theme } = useTheme();

  const defaultIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const defaultOut: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0 },
  };

  const inVariants = animationIn || defaultIn;
  const outVariants = animationOut || defaultOut;

  return (
    <motion.div
      className="relative overflow-hidden w-full h-full"
      style={
        props.fill ? undefined : { width: props.width, height: props.height }
      }
    >
      <motion.div
        key="light"
        variants={theme === "light" ? inVariants : outVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          {...props}
          src={lightSrc}
          alt={props.alt}
          className={`${props.className || ""} ${props.fill ? "object-cover" : ""}`}
        />
      </motion.div>

      <motion.div
        key="dark"
        variants={theme === "dark" ? inVariants : outVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          {...props}
          src={darkSrc}
          alt={props.alt}
          className={`${props.className || ""} ${props.fill ? "object-cover" : ""}`}
        />
      </motion.div>
    </motion.div>
  );
}
