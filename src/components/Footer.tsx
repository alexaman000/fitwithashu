"use client";

import { useLocale } from "next-intl";
import { Dumbbell, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const locale = useLocale();

  const t = {
    brandFirst: "FITWITH",
    brandSecond: "ASHUTOSH",
    tagline: locale === "hi" 
      ? "अनुशासन ही जीत की कुंजी है। सेना का अनुशासन, वैज्ञानिक दृष्टिकोण, और आपके फिटनेस गोल्स।" 
      : "Discipline is the key to victory. Military precision, advanced sports science, and your fitness goals.",
    quickLinks: locale === "hi" ? "त्वरित लिंक्स" : "Quick Links",
    about: locale === "hi" ? "मेरे बारे में" : "About Me",
    services: locale === "hi" ? "सेवाएं" : "Coaching Services",
    vault: locale === "hi" ? "द वॉल्ट" : "The Vault",
    contact: locale === "hi" ? "संपर्क करें" : "Contact",
    disclaimer: locale === "hi"
      ? "एक सैनिक के अनुशासन से प्रेरित। © 2026 फिटविथआशुतोष। सभी अधिकार सुरक्षित।"
      : "Inspired by the discipline of a Soldier. © 2026 FitWithAshutosh. All Rights Reserved.",
    quote: locale === "hi"
      ? "\"स्टेरॉयड्स को ना कहें, अपना शरीर प्राकृतिक रूप से बनाएं।\""
      : "\"Say No to Steroids, Build Your Body Naturally.\""
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#070707]/70 backdrop-blur-xl border-t border-white/5 py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative z-10">
        {/* Brand column */}
        <div className="flex flex-col space-y-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-black text-2xl tracking-tighter text-white hover:opacity-90 transition-opacity"
          >
            {t.brandFirst}<span className="text-accent">{t.brandSecond}</span>
          </a>
          <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
            {t.tagline}
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://www.facebook.com/ashutosh.kumar.937712/" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white text-text-secondary transition-all"
              aria-label="Facebook Profile"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://instagram.com/ashufit_08" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:border-transparent hover:text-white text-text-secondary transition-all"
              aria-label="Instagram Profile"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Links column */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-white font-black text-sm uppercase tracking-widest">{t.quickLinks}</h4>
          <ul className="space-y-2.5">
            <li>
              <a
                href="#about"
                onClick={(e) => handleScroll(e, "about")}
                className="text-text-secondary hover:text-white text-sm transition-colors"
              >
                {t.about}
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleScroll(e, "services")}
                className="text-text-secondary hover:text-white text-sm transition-colors"
              >
                {t.services}
              </a>
            </li>
            <li>
              <a
                href="#vault"
                onClick={(e) => handleScroll(e, "vault")}
                className="text-text-secondary hover:text-white text-sm transition-colors"
              >
                {t.vault}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact column */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-white font-black text-sm uppercase tracking-widest">{t.contact}</h4>
          <ul className="space-y-3.5 text-text-secondary text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-accent" />
              <a href="tel:+917667728871" className="hover:text-white transition-colors">
                +91 76677 28871
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-accent" />
              <a href="mailto:ak110113013@gmail.com" className="hover:text-white transition-colors">
                ak110113013@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-accent" />
              <span>India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto h-px bg-white/5 my-10" />

      {/* Quote */}
      <div className="max-w-7xl mx-auto text-center mb-10 relative z-10">
        <p className="text-xl md:text-2xl font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">
          {t.quote}
        </p>
      </div>

      {/* Copyright info */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-text-secondary text-xs text-center relative z-10">
        <p>{t.disclaimer}</p>
        <p className="flex items-center gap-1.5 uppercase font-bold tracking-wider text-[10px] text-white/50">
          <Dumbbell className="w-3.5 h-3.5 text-accent animate-pulse" /> FORGED IN DISCIPLINE
        </p>
      </div>
    </footer>
  );
}
