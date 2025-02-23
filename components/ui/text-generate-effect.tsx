import React, { useEffect, useState } from "react"
import { motion, animate } from "framer-motion"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import type { Components } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

// Define custom components interface extending the base Components type
interface CustomComponents extends Components {
  math: React.ComponentType<{ children: React.ReactNode }>;
  inlineMath: React.ComponentType<{ children: React.ReactNode }>;
}

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]]
  }
}

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string
  className?: string
}) => {
  const [visibleText, setVisibleText] = useState<string>("")
  const wordsArray = words.split(" ") // Split into individual words

  useEffect(() => {
    let currentText = ""
    const controls = animate(0, wordsArray.length, {
      type: "tween",
      duration: 1.5, // Adjust speed as needed
      ease: "easeInOut",
      onUpdate: (latest) => {
        const index = Math.floor(latest)
        currentText = wordsArray.slice(0, index + 1).join(" ") // Reveal words progressively
        setVisibleText(currentText)
      },
    })

    return controls.stop
  }, [words])

  const components: CustomComponents = {
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || "")
      const str = String(children).replace(/\n$/, "")
      
      if (!match) {
        return (
          <code className="bg-gray-200 dark:bg-gray-800 rounded px-1">
            {str}
          </code>
        )
      }

      return (
        <div className="rounded-md overflow-hidden my-4">
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            customStyle={{
              margin: 0,
              padding: '1rem',
              borderRadius: '0.375rem'
            }}
          >
            {str}
          </SyntaxHighlighter>
        </div>
      )
    },
    math: ({ children }) => (
      <MathJax dynamic className="my-4 flex justify-center">
        {children}
      </MathJax>
    ),
    inlineMath: ({ children }) => (
      <MathJax dynamic inline>
        {children}
      </MathJax>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    p: ({ children }) => (
      <p className="mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">
        {children}
      </ol>
    )
  }

  return (
    <motion.div className={cn("prose dark:prose-invert max-w-none", className)}>
      <MathJaxContext config={config}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          components={components}
        >
          {visibleText}
        </ReactMarkdown>
      </MathJaxContext>
    </motion.div>
  )
}