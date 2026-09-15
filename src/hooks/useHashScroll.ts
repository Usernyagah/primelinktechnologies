import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to a hash fragment on load (e.g. /#products legacy links). */
export function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const sectionId = hash.replace("#", "");
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    });
  }, [hash]);
}
