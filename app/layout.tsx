import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "PropInvest Pro - UK Property Investment Platform",
  description: "The UK's most comprehensive property investment platform. Discover the best areas for HMO conversions and uncover hidden lease extension opportunities across 25 million properties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
