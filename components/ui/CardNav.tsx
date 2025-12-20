"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface Link {
  label: string;
  ariaLabel: string;
  href: string;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links?: Link[];
}

interface CardNavProps {
  logo?: string;
  logoDark?: string;
  logoLight?: string;
  logoAlt?: string;
  items: NavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav = ({
  logo,
  logoDark,
  logoLight,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#0b0616",
  menuColor = "#ffffff",
  buttonBgColor = "#ffffff",
  buttonTextColor = "#0b0616",
}: CardNavProps) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Use useEffect instead of useLayoutEffect to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Better theme detection - use resolvedTheme which accounts for system preference
  const currentTheme = mounted ? (resolvedTheme || theme) : 'dark';
  const isDark = currentTheme === 'dark';

  // Determine which logo to use
  const currentLogo = logoDark && logoLight 
    ? (isDark ? logoDark : logoLight)
    : logo;

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 220;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) return 60 + contentEl.scrollHeight + 12;
    }
    return 220;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.35,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.3, ease, stagger: 0.06 },
      "-=0.15"
    );

    return tl;
  };

  useLayoutEffect(() => {
    tlRef.current = createTimeline();
    return () => {
      tlRef.current?.kill();
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const onResize = () => {
      tlRef.current?.kill();
      tlRef.current = createTimeline();
      if (isExpanded) tlRef.current?.progress(1);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div 
      className={`fixed left-1/2 -translate-x-1/2 top-[1.2em] w-[92%] max-w-[820px] z-[9999] ${className}`}
      style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.2s' }}
    >
      <nav
        ref={navRef}
        className={`rounded-xl shadow-lg relative overflow-hidden will-change-[height] backdrop-blur-xl border transition-colors ${
          isDark 
            ? 'bg-white/10 border-white/20' 
            : 'bg-black/10 border-black/20'
        }`}
        style={{ 
          background: isDark
            ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)',
          boxShadow: isDark
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            : '0 8px 32px 0 rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* TOP BAR */}
        <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 z-10">
          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="flex flex-col gap-[6px] hover:scale-110 transition-transform"
          >
            <span
              className={`w-6 h-[2px] transition-all ${
                isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
              style={{ 
                backgroundColor: isDark ? '#ffffff' : '#0b0616',
                boxShadow: isDark 
                  ? '0 2px 8px rgba(255,255,255,0.3)' 
                  : '0 2px 8px rgba(0,0,0,0.2)'
              }}
            />
            <span
              className={`w-6 h-[2px] transition-all ${
                isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
              style={{ 
                backgroundColor: isDark ? '#ffffff' : '#0b0616',
                boxShadow: isDark 
                  ? '0 2px 8px rgba(255,255,255,0.3)' 
                  : '0 2px 8px rgba(0,0,0,0.2)'
              }}
            />
          </button>

          {/* Logo */}
          <img 
            src={currentLogo} 
            alt={logoAlt} 
            className="h-[75px] drop-shadow-lg transition-opacity duration-300" 
            style={{ 
              filter: isDark
                ? 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                : 'drop-shadow(0 0 10px rgba(0,0,0,0.2))'
            }}
          />

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`w-9 h-9 flex items-center justify-center rounded-md backdrop-blur-sm transition-all border hover:scale-110 ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 border-white/20'
                : 'bg-black/10 hover:bg-black/20 border-black/20'
            }`}
            style={{ 
              color: isDark ? '#ffffff' : '#0b0616',
              boxShadow: isDark
                ? '0 4px 16px rgba(255,255,255,0.1)'
                : '0 4px 16px rgba(0,0,0,0.1)'
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

        </div>

        {/* MENU */}
        <div
          className={`card-nav-content absolute inset-x-0 top-[60px] p-3 flex flex-col md:flex-row gap-3 ${
            isExpanded ? "visible" : "invisible pointer-events-none"
          }`}
        >
          {(items || []).map((item, idx) => (
            <div
              key={item.label}
              ref={setCardRef(idx)}
              className="
                flex flex-col justify-between
                rounded-lg
                px-4 py-3.5
                min-h-[100px]
                md:flex-1
                text-sm
              "
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >

              <div className="font-medium tracking-tight">
                {item.label}
              </div>

              <div className="mt-2 flex flex-col gap-1">
                {item.links?.map((lnk, i) => (
                  <a
                    key={i}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    className="inline-flex items-center gap-1 text-[13px] opacity-80 hover:opacity-100"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;