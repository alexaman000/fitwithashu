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
  title: "FitWithAshu | Premium Fitness Coach",
  description: "Disciplined. Powerful. Motivational. Join Ashutosh Kumar, Soldier and Professional Fitness Coach with 10+ Years of Experience.",
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
      <body className="min-h-full flex flex-col bg-primary text-foreground overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

