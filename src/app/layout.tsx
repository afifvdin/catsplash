import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import ReactQueryProvider from "@/components/react-query-provider"

export const metadata: Metadata = {
  title: "Catsplash",
  description: "a cataas frontend",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={GeistSans.className + " tracking-tight h-full"}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
