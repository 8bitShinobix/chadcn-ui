import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "chadcn - Production-Ready SaaS Blocks",
    template: "%s | chadcn",
  },
  description:
    "A shadcn-compatible library of production-ready SaaS blocks. Copy, paste, and customize beautiful components for your next project.",
  keywords: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "shadcn",
    "UI components",
    "SaaS",
    "blocks",
    "authentication",
    "dashboard",
  ],
  authors: [{ name: "8bitShinobi" }],
  creator: "8bitShinobi",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "chadcn",
    title: "chadcn - Production-Ready SaaS Blocks",
    description:
      "A shadcn-compatible library of production-ready SaaS blocks. Copy, paste, and customize beautiful components for your next project.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "chadcn - Production-Ready SaaS Blocks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "chadcn - Production-Ready SaaS Blocks",
    description:
      "A shadcn-compatible library of production-ready SaaS blocks. Copy, paste, and customize.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-foreground min-h-screen font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
