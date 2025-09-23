import type { Metadata } from "next";
import "./globals.css";

import "../app/fonts.css";
import Nav from "./nav/Nav";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "Shehta Project ",
  description: "Shehta Trading FullStack Project ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-graphic">
        <Nav />
        <main className="relative top-0">
          {" "}
          {/* إضافة padding-top */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
