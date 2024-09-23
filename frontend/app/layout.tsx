import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";

export const metadata: Metadata = {
  title: "CarHub",
  description: "Find and buy your next car easily with CarHub. Browse a wide selection of new and used vehicles, compare prices, and enjoy hassle-free delivery—all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
