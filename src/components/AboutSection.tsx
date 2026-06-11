"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryModal from "./StoryModal";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const t = useTranslations("AboutSection");
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text from left
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Parallax and fade in image from right
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Animate Stats
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-32 px-6 md:px-16 lg:px-24 bg-primary text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div ref={textRef} className="flex flex-col space-y-8 z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-1 bg-accent"></div>
            <h3 className="text-accent font-bold tracking-[0.2em] uppercase text-sm">
              {t("subtitle")}
            </h3>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">
            {t("title")}
          </h2>

          <div className="space-y-6 text-text-secondary text-lg md:text-xl leading-relaxed">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setIsStoryOpen(true)}
              className="px-8 py-4 bg-transparent border border-accent text-accent hover:bg-accent hover:text-white font-bold rounded-sm uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              {t("cta")}
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div ref={imageRef} className="relative w-full h-[600px] rounded-lg overflow-hidden glass p-2 group">
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10"></div>
          {/* Using a placeholder for now until we load the gallery images properly, but let's use one of the uploaded ones */}
          <img
            src="/images/gallery/about-new.jpeg"
            alt="Ashutosh Kumar Soldier"
            className="w-full h-full object-cover object-top rounded-lg transition-all duration-700 transform group-hover:scale-105"
          />
        </div>
      </div>

      {/* Story Modal */}
      <StoryModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      {/* Stats Counter Section */}
      <div ref={statsRef} className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
        {[
          { value: "10+", label: t("stats.experience") },
          { value: "1000+", label: t("stats.clients") },
          { value: "500+", label: t("stats.transformations") },
          { value: "24/7", label: t("stats.support") },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-6 glass rounded-lg border-b-4 border-b-accent">
            <span className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</span>
            <span className="text-text-secondary text-sm md:text-base font-semibold uppercase tracking-wider text-center">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
