"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

export default function GallerySection() {
  const t = useTranslations("GallerySection");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Distribute all 25 images
  const images = Array.from({ length: 25 }, (_, i) => `/images/gallery/gallery-${i + 1}.jpg`);
  
  // Show 9 images initially, or all 25 if expanded
  const visibleImages = showAll ? images : images.slice(0, 9);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((prev) => (prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((prev) => (prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null));
  };

  return (
    <section id="vault" className="relative w-full py-32 bg-[#0B0B0B] text-white">
      {/* Fade out gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-20">
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <div className="w-12 h-1 bg-accent"></div>
          <h3 className="text-accent font-bold tracking-[0.2em] uppercase text-sm">
            {t("subtitle")}
          </h3>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            {t("title")}
          </h2>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleImages.map((src, idx) => (
              <motion.div
                key={src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => setActiveIdx(idx)}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-lg group cursor-pointer border border-white/5 hover:border-accent/40 bg-secondary/30 transition-colors duration-300"
              >
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 z-10" />
                
                {/* Image */}
                <Image
                  src={src}
                  alt={`Vault Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105 filter grayscale contrast-[1.05] group-hover:grayscale-0"
                  unoptimized
                />

                {/* Hover UI elements */}
                <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Top corner accents */}
                  <div className="flex justify-between">
                    <div className="w-4 h-4 border-t-2 border-l-2 border-accent" />
                    <div className="w-4 h-4 border-t-2 border-r-2 border-accent" />
                  </div>

                  {/* Center pop icon */}
                  <div className="self-center p-3 rounded-full bg-accent/90 text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-6 h-6" />
                  </div>

                  {/* Bottom details & corner accents */}
                  <div className="flex justify-between items-end">
                    <div className="w-4 h-4 border-b-2 border-l-2 border-accent" />
                    <span className="text-xs font-bold tracking-widest text-white/70 uppercase">
                      Image {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="w-4 h-4 border-b-2 border-r-2 border-accent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-16">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-10 py-4 border border-accent text-accent hover:bg-accent hover:text-white font-black rounded-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,45,45,0.05)] hover:shadow-[0_0_25px_rgba(255,45,45,0.3)] active:scale-95 cursor-pointer w-full sm:w-auto"
          >
            {showAll ? "Collapse Vault" : "Expand Full Vault"}
          </button>
          
          <a
            href="https://www.facebook.com/ashutosh.kumar.937712/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-[#1877F2] hover:bg-[#166FE5] text-white font-black rounded-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(24,119,242,0.3)] hover:shadow-[0_0_25px_rgba(24,119,242,0.5)] active:scale-95 flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            Watch More on Facebook
          </a>

          <a
            href="https://instagram.com/ashufit_08"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 hover:opacity-90 text-white font-black rounded-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(225,48,108,0.3)] hover:shadow-[0_0_25px_rgba(225,48,108,0.5)] active:scale-95 flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 select-none"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors z-[120] cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-4 rounded-full bg-white/5 hover:bg-white/15 text-white/85 hover:text-white border border-white/10 transition-colors z-[120] cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-4 rounded-full bg-white/5 hover:bg-white/15 text-white/85 hover:text-white border border-white/10 transition-colors z-[120] cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Content Container */}
            <div 
              className="relative w-full max-w-[1000px] h-[70vh] md:h-[80vh] flex flex-col justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Pop Wrapper */}
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full h-full"
              >
                <Image
                  src={images[activeIdx]}
                  alt={`Vault Image ${activeIdx + 1}`}
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              </motion.div>

              {/* Bottom Image Status Bar */}
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <span className="text-sm font-black tracking-[0.25em] text-accent uppercase">
                  VAULT IMAGE {String(activeIdx + 1).padStart(2, '0')} OF {images.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
