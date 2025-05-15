"use client";

import { useEffect } from "react";

export function ScrollbarController() {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Add scrolling class to multiple elements for better compatibility
      document.documentElement.classList.add("scrolling");
      document.body.classList.add("scrolling");

      // Clear any existing timeout
      clearTimeout(scrollTimeout);

      // Remove scrolling class after scrolling stops
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove("scrolling");
        document.body.classList.remove("scrolling");
      }, 1000);
    };

    // Listen to multiple events
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleScroll);

    // Initial check if page is already scrolled
    if (window.scrollY > 0) {
      handleScroll();
    }

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      clearTimeout(scrollTimeout);
      document.documentElement.classList.remove("scrolling");
      document.body.classList.remove("scrolling");
    };
  }, []);

  return null;
}
