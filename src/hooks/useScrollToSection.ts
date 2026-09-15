import { useEffect } from "react";

export function useScrollToSection(sectionId: string | undefined) {
  useEffect(() => {
    if (!sectionId) return;

    const scrollToSection = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      }
    };

    requestAnimationFrame(scrollToSection);
  }, [sectionId]);
}
