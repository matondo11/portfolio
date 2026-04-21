"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypingNameProps {
  name: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBeforeDelete?: number;
  delayBeforeRetry?: number;
}

export default function TypingName({
  name,
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBeforeDelete = 2000,
  delayBeforeRetry = 500,
}: TypingNameProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < name.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(name.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === name.length) {
      // Wait before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBeforeDelete);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, deletingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      // Reset
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, delayBeforeRetry);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, name, typingSpeed, deletingSpeed, delayBeforeDelete, delayBeforeRetry]);

  return (
    <div className="flex items-center gap-1">
      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">
        {displayedText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-accent"
      >
        |
      </motion.span>
    </div>
  );
}
