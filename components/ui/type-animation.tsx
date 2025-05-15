"use client";

import { useEffect, useState } from "react";

interface TypeAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

export function TypeAnimation({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
}: TypeAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentText = texts[textIndex];
    const isComplete = displayText === currentText;

    if (!isDeleting && isComplete) {
      timeout = setTimeout(() => setIsDeleting(true), delayBetweenTexts);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      const nextChar = isDeleting
        ? displayText.slice(0, -1)
        : currentText.slice(0, displayText.length + 1);

      timeout = setTimeout(
        () => setDisplayText(nextChar),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    textIndex,
    isDeleting,
    texts,
    typingSpeed,
    deletingSpeed,
    delayBetweenTexts,
  ]);

  return (
    <span className="text-primary">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
