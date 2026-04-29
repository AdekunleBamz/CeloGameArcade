import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

const DEFAULT_APP_URL = "https://celogamearcade.vercel.app" as const;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || DEFAULT_APP_URL;
const METADATA_BASE = (() => {
  try {
    return new URL(APP_URL);
  } catch {
    return new URL(DEFAULT_APP_URL);
  }
})();

const frame = {
  version: "1",
  imageUrl: `${APP_URL}/image-3-2.png`,
  button: {
    title: "🎮 Play Now",
    action: {
      type: "launch_frame",
      name: "Celo Game Arcade",
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash-200.png`,
      splashBackgroundColor: "#0f0c29"
    }
  }
};

export const metadata: Metadata = {
  applicationName: "Celo Game Arcade",
  title: "Celo Game Arcade",
  description: "Play classic arcade games and compete for stablecoin prizes on Celo mainnet.",
  metadataBase: METADATA_BASE,
  alternates: {
    canonical: APP_URL,
  },
  icons: {
    icon: "/brand-mark.svg",
    shortcut: "/favicon.ico",
    apple: "/icon-1024.png",
  },
  openGraph: {
    title: "Celo Game Arcade",
    description: "Play classic arcade games and compete for stablecoin prizes on Celo mainnet.",
    url: APP_URL,
    siteName: "Celo Game Arcade",
    images: [
      {
        url: `${APP_URL}/image-3-2.png`,
        width: 1200,
        height: 800,
        alt: "Celo Game Arcade",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Celo Game Arcade",
    description: "Play classic arcade games and compete for stablecoin prizes on Celo mainnet.",
    images: [`${APP_URL}/image-3-2.png`],
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0c29",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        <meta name="mobile-web-app-capable" content="yes" />
        
        <meta name="format-detection" content="telephone=no" />
        
        <link rel="preconnect" href="https://celogamearcade.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta
          name="talentapp:project_verification"
          content="586e76a697fafb4d5a18950b62f6e4a785769582b0d692f9ba2b85e89bbde4369b84bf85df70990ae9f13c1f64fba1c361a6a9903cf3376e45627236802cc9e4"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
