import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/NavBar";
import { Figtree } from "next/font/google";
const figtree = Figtree({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <main className="px-2">
              {authModal}
              <NavBar />
              <div className="h-16" />
              <div className=" ">{children}</div>
            </main>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
