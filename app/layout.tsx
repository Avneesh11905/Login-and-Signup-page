import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import ThemeProvider from "@/components/ThemeProvider";


export const metadata: Metadata = {
  title: "AutoML",
  description: "ehe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
       
      
      </body>
    </html>
  );
}
