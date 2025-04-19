import { Roboto } from "next/font/google";
import "./globals.css";

import { ContextProvider } from "./context";

import { SessionProvider } from "next-auth/react";
import Header from "@/app/components/Header";

const roboto = Roboto({
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <Header />
        <SessionProvider>
          <ContextProvider>{children}</ContextProvider>
        </SessionProvider>
        <div className="w-full h-10 bg-amber-200">Footer</div>
      </body>
    </html>
  );
}
