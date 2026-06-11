"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ConsultationModal from "./ConsultationModal";

export default function HeroSection() {
  const t = useTranslations("HomePage.hero");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleScrollToVault = () => {
    const vaultElement = document.getElementById("vault");
    if (vaultElement) {
      vaultElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
        {/* Animated Background Mesh & Lights */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-accent/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent/5 blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(11,11,11,0.6)_80%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0B]/50 to-[#0B0B0B]/80" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto mt-20">
          {/* Subheadline Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-accent font-black tracking-[0.25em] uppercase text-xs md:text-sm mb-6 bg-accent/10 px-4 py-2 border border-accent/20 rounded-full inline-block backdrop-blur-sm">
              {t('subheadline')}
            </p>
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9] text-white"
          >
            DISCIPLINE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent">CREATES</span> STRENGTH
          </motion.h1>
          
          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-2xl text-text-secondary font-medium italic mb-12 max-w-3xl leading-relaxed"
          >
            {t('quote')}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
          >
            <button 
              onClick={() => setIsConsultationOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-sm uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,45,45,0.4)] cursor-pointer"
            >
              {t('cta1')}
            </button>
            <button 
              onClick={handleScrollToVault}
              className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 text-white font-bold rounded-sm uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {t('cta3')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Consultation WhatsApp Modal */}
      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </>
  );
}
