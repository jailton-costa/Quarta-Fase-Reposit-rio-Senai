import type React from "react"
import type { Metadata } from "next"
import { Crimson_Pro } from "next/font/google"
import "./globals.css"

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Coffee Notes - A Journey Through Coffee Culture",
  description: "Exploring the art, science, and stories behind every cup",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${crimsonPro.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
