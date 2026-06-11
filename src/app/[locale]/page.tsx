import { setRequestLocale } from 'next-intl/server';
import VoiceWelcome from '@/components/VoiceWelcome';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col min-h-screen">
      <VoiceWelcome />
      <Header />
      <HeroSection />

      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
