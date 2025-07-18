import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Sam Rosenbaum - AIM Portfolio",
  description: "A nostalgic AOL Instant Messenger and Windows 95 themed personal portfolio showcasing Sam's work in AI, web development, and product management.",
  keywords: "portfolio, AIM, Windows 95, AI, web development, Sam Rosenbaum, UXPin, Case Cracker AI",
  authors: [{ name: "Sam Rosenbaum" }],
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
