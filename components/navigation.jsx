"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import CardNav from "@/components/ui/CardNav";
import Image from "next/image";
import { useRouter } from "next/navigation";

import logoLight from "@/public/images/logo2.png";
import logoDark from "@/public/images/logo2_dark.png";

export default function Navigation() {
  const router = useRouter();
  const { theme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the actual theme that should be displayed
  // Priority: resolvedTheme > theme > systemTheme > 'dark' (fallback)
  const currentTheme = mounted 
    ? (resolvedTheme || theme || systemTheme || 'dark')
    : 'dark'; // Always default to dark on SSR
  
  const isDark = currentTheme === 'dark';

  const items = [
    {
      label: "Home",
      bgColor: isDark ? "#0D0716" : "#f8f9fa",
      textColor: isDark ? "#ffffff" : "#000000",
      links: [
        {
          label: "Go to Home",
          ariaLabel: "Navigate to Home",
          href: "/",
        },
      ],
    },
    {
      label: "About",
      bgColor: isDark ? "#140B22" : "#e9ecef",
      textColor: isDark ? "#ffffff" : "#000000",
      links: [
        {
          label: "About Me",
          ariaLabel: "Navigate to About",
          href: "/about",
        },
      ],
    },
    {
      label: "Projects",
      bgColor: isDark ? "#170D27" : "#dee2e6",
      textColor: isDark ? "#ffffff" : "#000000",
      links: [
        {
          label: "All Projects",
          ariaLabel: "Navigate to Projects",
          href: "/projects",
        },
      ],
    },
    {
      label: "Blog",
      bgColor: isDark ? "#1F1431" : "#ced4da",
      textColor: isDark ? "#ffffff" : "#000000",
      links: [
        {
          label: "Read Blog",
          ariaLabel: "Navigate to Blog",
          href: "/blog",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: isDark ? "#271E37" : "#adb5bd",
      textColor: isDark ? "#ffffff" : "#000000",
      links: [
        {
          label: "Contact Me",
          ariaLabel: "Navigate to Contact",
          href: "/contact",
        },
      ],
    },
  ];

  return (
    <CardNav
      key={currentTheme} // Force re-render when theme changes
      logoLight={logoLight.src}
      logoDark={logoDark.src}
      logoAlt="Zenoguy Logo"
      items={items}
      baseColor={isDark ? "#ffffff" : "#000000"}
      menuColor={isDark ? "#0b0616" : "#ffffff"}
      buttonBgColor={isDark ? "#111111" : "#f1f3f5"}
      buttonTextColor={isDark ? "#ffffff" : "#000000"}
      ease="power3.out"
    />
  );
}