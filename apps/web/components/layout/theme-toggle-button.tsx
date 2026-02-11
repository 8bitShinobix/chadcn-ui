"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      <style>{`
        @keyframes uzumakiSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .uzumaki-spin {
          animation: uzumakiSpin 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
      <button
        onClick={handleToggle}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full focus:outline-none"
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className={isAnimating ? "uzumaki-spin" : ""}
          onAnimationEnd={() => setIsAnimating(false)}
        >
          <ellipse
            cx="50"
            cy="50"
            rx="47.14"
            ry="47.14"
            stroke="currentColor"
            strokeWidth="4.36"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 49.1073,47.8497 c -6.2348,11.8744 2.6531,18.9422 8.1143,18.8657 11.6767,-0.1635 15.7183,-11.9171 15.8228,-17.0400 0.1966,-9.6330 -7.3420,-23.6994 -22.3143,-23.7343 -7.7016,-0.0179 -26.4873,5.2265 -26.3714,27.1828 0.1589,30.0907 31.1303,42.3806 49.0913,37.5285"
            stroke="currentColor"
            strokeWidth="5.71"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
