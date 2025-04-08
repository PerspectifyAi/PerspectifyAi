import React from "react";
import { cn } from "@/lib/utils";

interface HexagonBackgroundProps {
  className?: string;
  opacity?: number;
  color?: string;
}

export const HexagonBackground = ({
  className,
  opacity = 0.08,
  color = "#4f46e5", // default to indigo-600
}: HexagonBackgroundProps) => {
  return (
    <div
      className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id="hexagon-pattern"
            patternUnits="userSpaceOnUse"
            width="20"
            height="17.32"
            patternTransform="scale(1)"
          >
            <polygon
              points="10,0 20,5 20,15 10,20 0,15 0,5"
              fill={color}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagon-pattern)" />
      </svg>
    </div>
  );
};

export default HexagonBackground;
