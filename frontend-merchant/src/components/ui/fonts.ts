import { MuseoModerno, Geist, Geist_Mono, Inter, Figtree } from "next/font/google";

export const figtreeHeading = Figtree({ subsets: ['latin'], variable: '--font-heading' });

export const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const museoModerno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-museo",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});