import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inmobiliaria Elite | Lujo Silencioso & Propiedades Exclusivas",
  description: "Descubre la plataforma inmobiliaria líder en propiedades de lujo, proyectos de vivienda y arriendos exclusivos. Tecnología de vanguardia para tu próximo hogar.",
  keywords: ["inmobiliaria", "lujo", "apartamentos", "casas", "ventas", "arriendos", "proyectos de vivienda"],
  authors: [{ name: "Inmobiliaria Elite" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
