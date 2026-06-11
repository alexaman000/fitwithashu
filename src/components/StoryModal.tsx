"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Award, Calendar, Heart, Zap } from "lucide-react";
import { useLocale } from "next-intl";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryModal({ isOpen, onClose }: StoryModalProps) {
  const locale = useLocale();

  const t = {
    title: locale === "hi" ? "आशुतोष कुमार की कहानी" : "Ashutosh Kumar's Story",
    tagline: locale === "hi" ? "अनुशासन में ढली और फिटनेस में निखारी गई यात्रा" : "A journey forged in discipline, perfected in fitness",
    crpfTitle: locale === "hi" ? "एक सैनिक के रूप में देश सेवा" : "Serving the Nation as a Soldier",
    crpfText: locale === "hi" 
      ? "एक सैनिक के रूप में, मैंने सीखा कि असली अनुशासन क्या होता है। मुश्किल से मुश्किल परिस्थितियों में मानसिक संतुलन और शारीरिक क्षमता को बनाए रखना ही मेरा दैनिक जीवन था। यही वो बुनियाद है जिसने मुझे सिखाया कि शरीर केवल वही कर सकता है जिसके लिए दिमाग उसे तैयार करता है।" 
      : "As a soldier, I learned the true definition of discipline. Maintaining absolute mental toughness and physical endurance under extreme conditions was my daily duty. This foundation taught me that the body only achieves what the mind believes.",
    fitnessTitle: locale === "hi" ? "कोचिंग में बदलाव" : "Transition to Elite Coaching",
    fitnessText: locale === "hi"
      ? "सेना के बाद, मैंने अपने जीवन का मिशन बनाया - लोगों को उनकी फिटनेस यात्रा में सही दिशा दिखाना। पिछले 10+ वर्षों से, मैंने वैज्ञानिक दृष्टिकोण और सैन्य सटीकता को मिलाकर 1,000 से अधिक लोगों का मार्गदर्शन किया है। मेरा लक्ष्य सिर्फ वजन कम करना नहीं, बल्कि एक ऐसा मजबूत माइंडसेट बनाना है जो कभी हार न माने।"
      : "Post-service, I made it my life's mission to guide others toward physical dominance and health. Over the last 10+ years, combining military precision with advanced sports science, I have coached more than 1,000 clients globally. My goal isn't just physical training; it's building a bulletproof mindset.",
    specialtiesTitle: locale === "hi" ? "मेरी विशेषज्ञता" : "Areas of Expertise",
    specialties: [
      {
        icon: <Shield className="w-5 h-5 text-accent" />,
        title: locale === "hi" ? "सैन्य अनुशासन" : "Military Style Discipline",
        desc: locale === "hi" ? "बिना किसी बहाने के लगातार मेहनत और लक्ष्य पर ध्यान देना।" : "No-nonsense coaching focused on consistency and zero excuses."
      },
      {
        icon: <Zap className="w-5 h-5 text-accent" />,
        title: locale === "hi" ? "बॉडी रीकंपोजिशन" : "Body Recomposition",
        desc: locale === "hi" ? "एक ही समय में चर्बी कम करना और मजबूत मसल्स बनाना।" : "Simultaneously losing stubborn body fat while constructing dense muscle."
      },
      {
        icon: <Heart className="w-5 h-5 text-accent" />,
        title: locale === "hi" ? "पोषण और आहार" : "Advanced Nutrition",
        desc: locale === "hi" ? "आपके शरीर की जरूरत के अनुसार सटीक मैक्रोज़ कैलकुलेटेड भोजन योजना।" : "Precise macro-based diet styling built for long-term sustainability."
      }
    ],
    quote: locale === "hi"
      ? "\"अनुशासन कोई सजा नहीं है; यह आपकी वास्तविक स्वतंत्रता की चाबी है। चलिए एक साथ इतिहास बनाते हैं।\""
      : "\"Discipline is not a punishment; it is the key to absolute freedom. Let's build your legacy together.\"",
    closeBtn: locale === "hi" ? "वापस जाएँ" : "Back to Main"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          {/* Backdrop click closes modal */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-[#161616] border border-white/10 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl z-[160]"
          >
            {/* Red Gradient Flare */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/5">
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-accent rounded-sm inline-block"></span>
                  {t.title}
                </h3>
                <p className="text-accent text-xs font-bold uppercase tracking-wider mt-1">{t.tagline}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-6 text-text-secondary text-sm md:text-base leading-relaxed">
              {/* Soldier Block */}
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg text-accent self-start md:self-auto">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1 uppercase tracking-wide">{t.crpfTitle}</h4>
                  <p className="text-text-secondary">{t.crpfText}</p>
                </div>
              </div>

              {/* Transition Block */}
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg text-accent self-start md:self-auto">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1 uppercase tracking-wide">{t.fitnessTitle}</h4>
                  <p className="text-text-secondary">{t.fitnessText}</p>
                </div>
              </div>

              {/* Image highlight of service or workout */}
              <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-white/10 my-6">
                <img
                  src="/images/gallery/gallery-4.jpg" 
                  alt="Ashutosh Kumar Fitness"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-center md:text-left">
                  <p className="text-white font-bold tracking-wide text-lg uppercase drop-shadow-md">
                    {locale === "hi" ? "अनुशासन ही जीत की कुंजी है।" : "Discipline is the Key to Victory."}
                  </p>
                </div>
              </div>

              {/* Specialties List */}
              <div className="space-y-4 pt-2">
                <h4 className="text-white font-black text-lg uppercase tracking-wider">{t.specialtiesTitle}</h4>
                <div className="grid grid-cols-1 gap-4">
                  {t.specialties.map((spec, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#0B0B0B] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="p-2.5 bg-accent/5 rounded-lg border border-accent/10 self-start text-accent">
                        {spec.icon}
                      </div>
                      <div>
                        <h5 className="text-white font-bold text-sm md:text-base uppercase tracking-wide">{spec.title}</h5>
                        <p className="text-text-secondary text-xs md:text-sm mt-1">{spec.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bold Quote */}
              <div className="p-6 rounded-xl border-l-4 border-accent bg-[#0B0B0B] italic text-white font-medium text-center my-6">
                {t.quote}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end mt-8 pt-4 border-t border-white/5">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg uppercase tracking-wider text-sm border border-white/10 transition-colors cursor-pointer"
              >
                {t.closeBtn}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
