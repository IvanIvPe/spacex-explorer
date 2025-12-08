import Footer from "@/app/components/Footer/Footer";
import Nav from "@/app/components/Navbar/Navbar";
import "./globals.css";

import React from "react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Nav />
        {children}
        <Footer />
    </html>
  );
}
