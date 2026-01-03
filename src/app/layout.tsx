import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puerto Café - Cafeterías de Veracruz",
  description: "Explora las mejores cafeterías para cada momento en Veracruz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}