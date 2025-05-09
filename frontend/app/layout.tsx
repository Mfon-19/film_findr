import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import SessionProviderClientComponent from "@/components/session-provider-client-component";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Film Findr",
  description: "The best place to find what to watch next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProviderClientComponent>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-lvh bg-[#00050d]`}>
          <div className="flex flex-col">
            <Header />
            {children}
            <Toaster />
          </div>
        </body>
      </html>
    </SessionProviderClientComponent>
  );
}
