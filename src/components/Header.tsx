"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultationModal from "./ConsultationModal";

export default function Header() {
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const t = {
    brandNameFirst: "FITWITH",
    brandNameSecond: "ASHUTOSH",
    about: locale === "hi" ? "मेरे बारे में" : "About Me",
    services: locale === "hi" ? "सेवाएं" : "Coaching Services",
    vault: locale === "hi" ? "द वॉल्ट" : "The Vault",
    cta: locale === "hi" ? "कंसल्टेशन बुक करें" : "Book Call",
  };

  const navLinks = [
    { label: t.about, href: "#about" },
    { label: t.services, href: "#services" },
    { label: t.vault, href: "#vault" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 glass h-20 flex items-center justify-between px-6 md:px-12 border-b border-white/5">
        {/* Brand Logo */}
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-black text-xl md:text-2xl tracking-tighter text-white hover:opacity-90 transition-opacity"
        >
          {t.brandNameFirst}<span className="text-accent">{t.brandNameSecond}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-sm font-semibold uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Panel */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-3 border-r border-white/10 pr-6">
            <Link
              href="/"
              locale="en"
              className={`text-xs font-bold uppercase tracking-wider transition-colors py-1 px-2 rounded-sm ${
                locale === "en" ? "bg-accent text-white" : "text-text-secondary hover:text-white"
              }`}
            >
              EN
            </Link>
            <Link
              href="/"
              locale="hi"
              className={`text-xs font-bold uppercase tracking-wider transition-colors py-1 px-2 rounded-sm ${
                locale === "hi" ? "bg-accent text-white font-devanagari" : "text-text-secondary hover:text-white"
              }`}
            >
              हिन्दी
            </Link>
          </div>

          {/* Book Consultation Button */}
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-white text-xs font-black uppercase tracking-wider rounded-sm shadow-[0_0_15px_rgba(255,45,45,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {t.cta}
          </button>
        </div>

        {/* Mobile Menu Buttons */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="p-2 rounded-full bg-accent text-white cursor-pointer shadow-[0_0_10px_rgba(255,45,45,0.3)]"
            aria-label="Book Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-secondary hover:text-white cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-lg flex flex-col p-8 md:hidden"
          >
            <div className="flex flex-col gap-6 items-center mt-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-2xl font-black uppercase tracking-widest text-text-secondary hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="w-full h-px bg-white/10 my-4" />

              {/* Language Switcher */}
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  locale="en"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-wider py-1 px-3 rounded-sm ${
                    locale === "en" ? "bg-accent text-white" : "text-text-secondary"
                  }`}
                >
                  🇺🇸 English
                </Link>
                <Link
                  href="/"
                  locale="hi"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-wider py-1 px-3 rounded-sm ${
                    locale === "hi" ? "bg-accent text-white" : "text-text-secondary"
                  }`}
                >
                  🇮🇳 हिन्दी
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consultation WhatsApp Modal */}
      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </>
  );
}
