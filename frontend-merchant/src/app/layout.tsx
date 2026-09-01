import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/providers/ModalProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { geistSans, geistMono, inter, figtreeHeading, museoModerno } from "@/components/ui/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "ASL Wallets",
    template: "%s - ASL Wallets",
  },
  description: "Welcome to ASL Wallets",
  icons: {
    icon: "/logo/asl_logo.png",
    shortcut: "/logo/asl_logo.png",
    apple: "/logo/asl_logo.png",
  },
  openGraph: {
    title: "ASL Wallets",
    description: "Welcome to ASL Wallets",
    images: [
      {
        url: "/logo/asl_logo.png",
        alt: "ASL Wallets",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "ASL Wallets",
    url: "https://aslwallets.co.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASL Wallets",
    description: "Welcome to ASL Wallets",
    images: "/logo/asl_logo.png",
    site: "@aslwallets",
    creator: "@aslwallets",
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
      suppressHydrationWarning
      className={cn("h-full", "antialiased", museoModerno.variable, geistSans.variable, geistMono.variable, "font-sans", inter.variable, figtreeHeading.variable)}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            {children}
            <ModalProvider />
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
