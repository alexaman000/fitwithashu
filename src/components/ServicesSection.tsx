"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Dumbbell, Target, Flame, Activity, Zap, Shield, Trophy, Heart } from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";

export default function ServicesSection() {
  const t = useTranslations("ServicesSection");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    { icon: <Dumbbell className="w-8 h-8" />, key: "personal_training" },
    { icon: <Target className="w-8 h-8" />, key: "online_coaching" },
    { icon: <Flame className="w-8 h-8" />, key: "weight_loss" },
    { icon: <Zap className="w-8 h-8" />, key: "muscle_gain" },
    { icon: <Shield className="w-8 h-8" />, key: "strength_training" },
    { icon: <Activity className="w-8 h-8" />, key: "body_recomposition" },
    { icon: <Trophy className="w-8 h-8" />, key: "competition_prep" },
    { icon: <Heart className="w-8 h-8" />, key: "diet_consultation" },
  ];

  return (
    <section id="services" className="relative w-full py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <div className="w-12 h-1 bg-accent"></div>
          <h3 className="text-accent font-bold tracking-[0.2em] uppercase text-sm">
            {t("subtitle")}
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              index={index} 
              icon={service.icon} 
              translationKey={service.key} 
              onClick={() => setIsModalOpen(true)}
            />
          ))}
        </div>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

function ServiceCard({ icon, translationKey, index, onClick }: { icon: React.ReactNode; translationKey: string; index: number; onClick: () => void }) {
  const t = useTranslations("ServicesSection.services");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      className="group relative p-8 rounded-xl glass border border-white/5 overflow-hidden flex flex-col items-center text-center hover:border-accent/50 transition-all duration-300 shadow-[0_0_0_rgba(255,45,45,0)] hover:shadow-[0_10px_30px_rgba(255,45,45,0.15)] cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="p-4 rounded-full bg-primary/80 border border-white/10 text-accent mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      
      <h4 className="text-xl font-bold mb-3 uppercase tracking-wide">
        {t(`${translationKey}.title`)}
      </h4>
      
      <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
        {t(`${translationKey}.description`)}
      </p>

      <button className="text-accent text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors flex items-center gap-2 pointer-events-none">
        {t("learn_more") || "Learn More"} <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
      </button>
    </motion.div>
  );
}
