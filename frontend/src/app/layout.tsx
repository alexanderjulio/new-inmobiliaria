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
  keywords: ["inmobiliaria", "lujo", "apartamentos", "casas", "ventas", "arriendos", "proyectos de vivienda", "Colombia", "Bogotá", "Medellín"],
  authors: [{ name: "Inmobiliaria Elite" }],
  openGraph: {
    title: "Inmobiliaria Elite | Propiedades de Lujo",
    description: "Encuentra tu próximo legado con la experiencia inmobiliaria más exclusiva del país.",
    url: 'https://inmobiliaria-elite.com',
    siteName: 'Inmobiliaria Elite',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Inmobiliaria Elite Luxury',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inmobiliaria Elite | Propiedades de Lujo',
    description: 'Encuentra tu próximo legado con la experiencia inmobiliaria más exclusiva del país.',
    images: ['/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
