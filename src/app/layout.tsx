import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/features/Navbar";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ReduxProvider from "@/store/storeProvider";
import Footer from "@/components/features/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ShopNest | Modern E-commerce",
    template: "%s | ShopNest",
  },
  description: "ShopNest is a modern and responsive e-commerce platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} bg-background text-foreground `}
      >
        <ThemeProvider>
          <ReduxProvider>
            <Navbar />

            <main>{children}</main>

            <Footer/>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
