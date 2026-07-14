import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GaFiwShop - ร้านขายสินค้าดิจิทัล",
  description: "ร้านขายสินค้าดิจิทัล Netflix, YouTube Premium, OTP เบอร์ และอื่น ๆ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className="min-h-full flex flex-col antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
