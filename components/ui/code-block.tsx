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

  // Basic syntax highlighting by applying Tailwind classes to code tokens
  const highlightSyntax = (line: string, lang: string) => {
    // eslint-disable-next-line prefer-const
    let highlightedLine = line;

    // Default text color based on language
    let defaultColor = "text-gray-200";
    if (lang === "javascript" || lang === "js" || lang === "jsx") {
      defaultColor = "text-gray-100";
    } else if (lang === "python" || lang === "py") {
      defaultColor = "text-gray-100";
    } else if (lang === "bash" || lang === "sh") {
      defaultColor = "text-gray-100";
    }

    // Tokenize the line for highlighting
    const tokens: { text: string; className: string }[] = [];
    let remainingLine = highlightedLine;

    // Language-specific highlighting rules
    if (lang === "javascript" || lang === "js" || lang === "jsx") {
      // Comments (// and /* */)
      const commentRegex = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)/m;
      const commentMatch = remainingLine.match(commentRegex);
      if (commentMatch) {
        const comment = commentMatch[0];
        tokens.push({ text: comment, className: "text-green-500 italic" });
        remainingLine = remainingLine.replace(comment, "");
      }

      // Keywords (e.g., function, const, let, var, return)
      const keywordRegex =
        /\b(function|const|let|var|return|if|else|for|while|class)\b/;
      const keywordParts = remainingLine.split(keywordRegex);
      for (let i = 0; i < keywordParts.length; i++) {
        if (keywordRegex.test(keywordParts[i])) {
          tokens.push({
            text: keywordParts[i],
            className: "text-blue-400 font-semibold",
          });
        } else {
          // Strings (single and double quotes)
          const stringRegex = /(['"](?:[^'\\]|\\.)*['"])/;
          const stringParts = keywordParts[i].split(stringRegex);
          for (let j = 0; j < stringParts.length; j++) {
            if (stringRegex.test(stringParts[j])) {
              tokens.push({
                text: stringParts[j],
                className: "text-orange-400",
              });
            } else {
              tokens.push({ text: stringParts[j], className: defaultColor });
            }
          }
        }
      }
    } else if (lang === "python" || lang === "py") {
      // Comments (#)
      const commentRegex = /(#.*$)/m;
      const commentMatch = remainingLine.match(commentRegex);
      if (commentMatch) {
        const comment = commentMatch[0];
        tokens.push({ text: comment, className: "text-green-500 italic" });
        remainingLine = remainingLine.replace(comment, "");
      }

      // Keywords (e.g., def, class, if, else, for, while)
      const keywordRegex =
        /\b(def|class|if|else|for|while|return|import|from)\b/;
      const keywordParts = remainingLine.split(keywordRegex);
      for (let i = 0; i < keywordParts.length; i++) {
        if (keywordRegex.test(keywordParts[i])) {
          tokens.push({
            text: keywordParts[i],
            className: "text-blue-400 font-semibold",
          });
        } else {
          // Strings
          const stringRegex = /(['"](?:[^'\\]|\\.)*['"])/;
          const stringParts = keywordParts[i].split(stringRegex);
          for (let j = 0; j < stringParts.length; j++) {
            if (stringRegex.test(stringParts[j])) {
              tokens.push({
                text: stringParts[j],
                className: "text-orange-400",
              });
            } else {
              tokens.push({ text: stringParts[j], className: defaultColor });
            }
          }
        }
      }
    } else if (lang === "bash" || lang === "sh") {
      // Comments (#)
      const commentRegex = /(#.*$)/m;
      const commentMatch = remainingLine.match(commentRegex);
      if (commentMatch) {
        const comment = commentMatch[0];
        tokens.push({ text: comment, className: "text-green-500 italic" });
        remainingLine = remainingLine.replace(comment, "");
      }

      // Commands (e.g., echo, cd, ls)
      const commandRegex = /\b(echo|cd|ls|cat|mkdir|rm|mv|cp|grep|chmod)\b/;
      const commandParts = remainingLine.split(commandRegex);
      for (let i = 0; i < commandParts.length; i++) {
        if (commandRegex.test(commandParts[i])) {
          tokens.push({
            text: commandParts[i],
            className: "text-blue-400 font-semibold",
          });
        } else {
          tokens.push({ text: commandParts[i], className: defaultColor });
        }
      }
    } else {
      // Default: no specific highlighting
      tokens.push({ text: remainingLine, className: defaultColor });
    }

    return tokens;
  };

  const lines = code.split("\n");

  return (
    <div
      className={`${className} group relative my-6 rounded-lg bg-black overflow-hidden`}
    >
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

      {/* Code content with line numbers */}
      <div className="max-h-[500px] overflow-auto bg-gray-700 font-mono text-sm">
        <div className="flex">
          {/* Line numbers column */}
          {showLineNumbers && (
            <div className="flex-shrink-0 w-10 pr-2 pl-4 py-4 text-muted-foreground/50 select-none border-r border-border/20 text-right">
              {lines.map((_, i) => (
                <div key={i} className="leading-relaxed">
                  {i + 1}
                </div>
              ))}
            </div>
          )}

          {/* Code content column */}
          <pre className="flex-1 p-4">
            <code className={`language-${language}`}>
              {lines.map((line, i) => {
                const tokens = highlightSyntax(line, language.toLowerCase());
                return (
                  <div
                    key={i}
                    className={
                      highlightLines.includes(i + 1)
                        ? "bg-primary/10 -mx-4 px-4 rounded-md border-l-2 border-primary"
                        : ""
                    }
                  >
                    {tokens.map((token, j) => (
                      <span key={j} className={token.className}>
                        {token.text || " "}
                      </span>
                    ))}
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>

      {/* Decorative sparkle */}
      <div className="absolute bottom-2 right-2 text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="w-4 h-4" />
      </div>
    </div>
  );
}
