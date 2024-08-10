import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Good Afternoon 🐧",
  description: "An experimental glimpse into keyless web3 accounts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-dvh p-6">
          <div className="max-h-full bg-primary rounded-3.5xl s:rounded-4xl flex flex-row p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
