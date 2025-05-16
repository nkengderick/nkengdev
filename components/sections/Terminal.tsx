"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface Command {
  command: string;
  output: string;
}

export const InteractiveTerminal: React.FC = () => {
  const t = useTranslations("about.terminal");
  const [activeCommand, setActiveCommand] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(terminalRef, { once: true, amount: 0.3 });

  const commands: Command[] = [
    {
      command: t("commands.aboutMe.command"),
      output: t.raw("commands.aboutMe.output") as string,
    },
    {
      command: t("commands.projects.command"),
      output: t("commands.projects.output"),
    },
    {
      command: t("commands.skills.command"),
      output: t("commands.skills.output"),
    },
  ];

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      const interval = setInterval(() => {
        setActiveCommand((prev) => (prev + 1) % commands.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isInView, commands.length]);

  return (
    <motion.div
      ref={terminalRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative overflow-hidden rounded-xl bg-black text-green-400 font-mono text-sm border border-green-500/30 shadow-[0_0_15px_rgba(0,255,0,0.15)]"
    >
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-2 bg-black/80 border-b border-green-500/20">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-xs opacity-80">
          {t("header")}
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCommand}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-2 flex items-center">
              <span className="text-green-400 mr-2">{t("prompt")}</span>
              <span className="text-white">
                {commands[activeCommand].command}
              </span>
            </div>
            <pre className="whitespace-pre-wrap text-green-300 overflow-x-auto">
              {commands[activeCommand].output}
            </pre>
          </motion.div>
        </AnimatePresence>

        {/* Blinking cursor */}
        <div className="mt-2 flex items-center">
          <span className="text-green-400 mr-2">{t("prompt")}</span>
          <span className="inline-block w-3 h-5 bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* Terminal glowing effect */}
      <div className="absolute inset-0 pointer-events-none border border-green-500/20 rounded-xl" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-green-500/5 to-transparent" />
    </motion.div>
  );
};
