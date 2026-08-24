import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/providers/ModalProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { geistSans, geistMono, inter, figtreeHeading, museoModerno } from "@/components/ui/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Payzones",
    template: "%s - Payzones",
  },
  description: "Welcome to Payzones",
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
  openGraph: {
    title: "Payzones",
    description: "Welcome to Payzones",
    images: [
      {
        url: "/logo/logo.png",
        alt: "Payzones",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "Payzones",
    url: "https://payzones.net",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payzones",
    description: "Welcome to Payzones",
    images: "/logo/logo.png",
    site: "@payzones",
    creator: "@payzones",
  },
};


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", museoModerno.variable, geistSans.variable, geistMono.variable, "font-sans", inter.variable, figtreeHeading.variable)}>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          {children}
          <ModalProvider />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
