import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ashutoshfitness.online"),
  title: "Ashutosh Sharma | Premium Gym Trainer & Fitness Coach",
  description: "Disciplined. Powerful. Motivational. Join Ashutosh Sharma, Soldier and Professional Gym Trainer with 10+ Years of Experience Naturally. Transform your body with elite fitness coaching.",
  keywords: [
    "ashutosh sharma gym trainer",
    "ashutosh kumar fitness coach",
    "premium gym trainer",
    "online personal trainer",
    "soldier fitness coach",
    "natural bodybuilding",
    "muscle gain expert",
    "weight loss coach",
    "best fitness coach online",
    "personal training"
  ],
  authors: [{ name: "Ashutosh Sharma" }],
  creator: "Ashutosh Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ashutoshfitness.online",
    title: "Ashutosh Sharma | Premium Gym Trainer & Fitness Coach",
    description: "Transform your body with Ashutosh Sharma, a Soldier and elite Gym Trainer with 10+ years of natural bodybuilding experience.",
    siteName: "FitWithAshu",
    images: [{
      url: "/images/gallery/hero-about.jpeg",
      width: 1200,
      height: 630,
      alt: "Ashutosh Sharma Gym Trainer"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashutosh Sharma | Premium Gym Trainer",
    description: "Transform your body with Ashutosh Sharma, a Soldier and elite Gym Trainer.",
    images: ["/images/gallery/hero-about.jpeg"],
  },
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${notoSansDevanagari.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col text-foreground overflow-x-hidden">
        <div className="main-bg"></div>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

