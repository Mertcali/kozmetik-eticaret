import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CartProvider } from "@/contexts/CartContext"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
})

export const metadata: Metadata = {
  title: "PickPrime - Global E-Commerce Platform",
  description: "Dünyanın dört bir yanından kaliteli ürünler - Elektronik, Moda, Ev & Yaşam ve daha fazlası",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
