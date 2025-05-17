"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Terminal, Code, Search, Sparkles } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  title?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "plain",
  fileName,
  title,
  highlightLines = [],
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get proper language icon
  const getLanguageIcon = () => {
    switch (language.toLowerCase()) {
      case "js":
      case "javascript":
      case "jsx":
        return <Code className="w-4 h-4 text-yellow-400" />;
      case "ts":
      case "typescript":
      case "tsx":
        return <Code className="w-4 h-4 text-blue-400" />;
      case "bash":
      case "sh":
      case "shell":
      case "zsh":
        return <Terminal className="w-4 h-4 text-green-400" />;
      case "python":
      case "py":
        return <Code className="w-4 h-4 text-blue-500" />;
      case "html":
        return <Code className="w-4 h-4 text-orange-500" />;
      case "css":
        return <Code className="w-4 h-4 text-blue-500" />;
      case "json":
        return <Search className="w-4 h-4 text-gray-400" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className={`${className} group relative my-6 rounded-lg overflow-hidden`}>
      {/* Header with file name and language */}
      <div className="flex items-center justify-between px-4 py-2 bg-card/90 border-b border-border/50 text-muted-foreground">
        <div className="flex items-center gap-2">
          {getLanguageIcon()}

          {fileName && (
            <span className="text-sm font-mono opacity-80">{fileName}</span>
          )}

          {!fileName && language && (
            <span className="text-sm font-mono opacity-80">{language}</span>
          )}

          {title && !fileName && (
            <span className="text-sm font-medium ml-2">{title}</span>
          )}
        </div>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="text-green-500"
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Copy className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Code content */}
      <div className="max-h-[500px] overflow-auto p-4 bg-card/70 font-mono text-sm relative">
        <pre className="relative">
          {showLineNumbers && (
            <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-end pr-2 text-muted-foreground/50 select-none border-r border-border/20">
              {code.split("\n").map((_, i) => (
                <div key={i} className="leading-relaxed">
                  {i + 1}
                </div>
              ))}
            </div>
          )}

          <code
            className={`language-${language}`}
            style={{ paddingLeft: showLineNumbers ? "2rem" : 0 }}
          >
            {code.split("\n").map((line, i) => (
              <div
                key={i}
                className={
                  highlightLines.includes(i + 1)
                    ? "bg-primary/10 -mx-4 px-4 rounded-md border-l-2 border-primary"
                    : ""
                }
              >
                {line || " "}
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Decorative sparkle */}
      <div className="absolute bottom-2 right-2 text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="w-4 h-4" />
      </div>
    </div>
  );
}
