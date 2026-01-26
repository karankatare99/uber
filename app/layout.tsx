import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uber Clone",
  description: "Go anywhere. Get anything.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Font class is applied in globals.css via @apply in body */}
      <body>
        {children}
      </body>
    </html>
  );
}