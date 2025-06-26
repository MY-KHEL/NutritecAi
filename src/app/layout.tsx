import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/Homepage/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nutritec Ai",
  description: "Spit don show wetin body dey hide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative">
          {children}
          <div className="absolute w-full h-full backdrop-blur-sm p-6 bg-black/30 top-0 left-0">
          <div className="p-16 rounded-2xl bg-black/50  w-full md:w-3/4  h-fit mt-20 md:mt-40 m-auto text-center">
            <h1 className="text-4xl md:text-6xl font-sans text-white"> <span className="text-project-green">NutritecAi</span> is currently in its  <span className="text-project-pink">Development</span> stage and will be launched  <span className="text-project-green">soon.</span></h1>
          </div>
          </div>
        
        
        <SiteFooter/>
        </div>
      </body>
    </html>
  );
}
