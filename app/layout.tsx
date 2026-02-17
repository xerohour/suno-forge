import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Music2 } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SunoForge - AI Music Prompt Engineering",
  description:
    "Craft perfect prompts for Suno AI with precision controls, batch generation, and intelligent templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Music2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                    SunoForge
                  </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                  <Link
                    href="/studio"
                    className="transition-colors hover:text-primary"
                  >
                    Studio
                  </Link>
                  <Link
                    href="/batch"
                    className="transition-colors hover:text-primary"
                  >
                    Batch
                  </Link>
                  <Link
                    href="/vision"
                    className="transition-colors hover:text-primary"
                  >
                    Vision
                  </Link>
                  <Link
                    href="/chatbot"
                    className="transition-colors hover:text-primary"
                  >
                    AI Chat
                  </Link>
                </nav>

                <ModeToggle />
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t py-6 md:py-0">
              <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
                <p className="text-sm text-muted-foreground">
                  Built with ❤️ for the Suno community
                </p>
                <p className="text-sm text-muted-foreground">
                  © 2026 SunoForge. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
