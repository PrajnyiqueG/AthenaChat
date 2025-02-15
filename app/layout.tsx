import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Student Assistant",
  description: "Your AI-powered student companion",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                var mode = localStorage.getItem('theme');
                var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                if (!mode && supportDarkMode)  document.documentElement.classList.add('dark');
                if (mode === 'dark') document.documentElement.classList.add('dark');
              } catch (e) {}
            })();
          `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground no-transition`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

