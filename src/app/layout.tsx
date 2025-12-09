import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

const APP_URL = "https://celogamearcade.vercel.app";

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
  title: "Celo Game Arcade",
  description: "Play classic arcade games and compete for CELO prizes! 0.1 CELO entry, daily prizes for top scorers.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: "Celo Game Arcade",
    description: "Play classic arcade games and compete for CELO prizes! 0.1 CELO entry, daily prizes for top scorers.",
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
    description: "Play classic arcade games and compete for CELO prizes! 0.1 CELO entry, daily prizes for top scorers.",
    images: [`${APP_URL}/image-3-2.png`],
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}