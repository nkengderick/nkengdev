"use client";

import { useState, useRef, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const posX = e.clientX - centerX;
    const posY = e.clientY - centerY;
    const rotateXUncapped = (-posY / rect.height) * 30;
    const rotateYUncapped = (posX / rect.width) * 30;
    // Limit rotation to a smaller range for subtlety
    setRotateX(Math.min(Math.max(rotateXUncapped, -10), 10));
    setRotateY(Math.min(Math.max(rotateYUncapped, -10), 10));
  };

  return (
    <div
      ref={cardRef}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => {
        setMouseOver(false);
        setRotateX(0);
        setRotateY(0);
      }}
      style={{
        transform: mouseOver
          ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : "rotateX(0) rotateY(0)",
        transition: mouseOver ? "transform 0.1s" : "transform 0.5s ease",
      }}
    >
      {children}
    </div>
  );
};
