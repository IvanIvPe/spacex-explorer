import Footer from "@/components/layout/Footer/Footer";
import Nav from "@/components/layout/Navbar/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import React from "react";
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('spacex_theme');
    var theme = 'dark';
    if (stored) {
      var parsed = JSON.parse(stored);
      if (parsed.state && parsed.state.theme) {
        theme = parsed.state.theme;
      }
    } else {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
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