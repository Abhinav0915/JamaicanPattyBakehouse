import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

interface AnimSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  direction?: "up" | "left" | "right" | "fade";
  threshold?: number;
}

export default function AnimSection({
  children,
  delay = 0,
  className = "",
  style = {},
  direction = "up",
  threshold = 0.1,
}: AnimSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  const hiddenTransform: Record<string, string> = {
    up:    "translateY(40px)",
    left:  "translateX(-40px)",
    right: "translateX(40px)",
    fade:  "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : hiddenTransform[direction],
        transition: `opacity 0.75s var(--ease-out-expo) ${delay}ms, transform 0.75s var(--ease-out-expo) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}