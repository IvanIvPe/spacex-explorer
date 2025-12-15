import Footer from "@/components/layout/Footer/Footer";
import Nav from "@/components/layout/Navbar/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Nav />
          <main>
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}