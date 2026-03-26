import type { Metadata } from "next";
import { Unbounded, Rajdhani, Oswald } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaultify — GitHub AI Search Extension",
  description: "Découvrez des repositories GitHub méconnus grâce à l'IA Groq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${unbounded.variable} ${rajdhani.variable} ${oswald.variable}`}
    >
      <body style={{
        minHeight: '100vh',
        background: '#0d1117',
        color: '#e6edf3',
        fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
        margin: 0,
      }}>
        {children}
      </body>
    </html>
  );
}
