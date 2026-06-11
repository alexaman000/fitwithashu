"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, MapPin, Activity, Check } from "lucide-react";
import { useLocale } from "next-intl";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const locale = useLocale();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [goal, setGoal] = useState("fat_loss");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !place) return;

    setLoading(true);

    const goalLabels: Record<string, { en: string; hi: string }> = {
      fat_loss: { en: "Fat Loss & Conditioning", hi: "चर्बी कम करना और फिट होना" },
      muscle_gain: { en: "Muscle Building & Strength", hi: "मसल्स बनाना और ताकत" },
      recomp: { en: "Body Recomposition (Fat Loss + Muscle Gain)", hi: "बॉडी रीकंपोजिशन (फैट लॉस + मसल गेन)" },
      diet_only: { en: "Personalized Diet Plan Only", hi: "केवल कस्टमाइज्ड डाइट प्लान" },
      personal_coaching: { en: "1-on-1 Elite Personal Training", hi: "1-on-1 पर्सनल ट्रेनिंग कोचिंग" },
    };

    const selectedGoal = goalLabels[goal] || goalLabels.fat_loss;
    const goalText = locale === "hi" ? selectedGoal.hi : selectedGoal.en;

    // Format WhatsApp Message
    const whatsappText = 
      locale === "hi"
        ? `नमस्ते कोच आशुतोष! मैं कंसल्टेशन बुक करना चाहता हूँ। मेरे विवरण इस प्रकार हैं:\n\n` +
          `👤 *नाम:* ${name}\n` +
          `📞 *फ़ोन नंबर:* ${phone}\n` +
          `📍 *स्थान/शहर:* ${place}\n` +
          `🎯 *ज़रूरत/लक्ष्य:* ${goalText}\n\n` +
          `कृपया मुझे आगे की प्रक्रिया बताएं। धन्यवाद!`
        : `Hello Coach Ashutosh! I want to book a fitness consultation. Here are my details:\n\n` +
          `👤 *Name:* ${name}\n` +
          `📞 *Phone:* ${phone}\n` +
          `📍 *Location:* ${place}\n` +
          `🎯 *Goal/Need:* ${goalText}\n\n` +
          `Please guide me on the next steps! Thank you.`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=917667728871&text=${encodedText}`;

    // Small delay to simulate action and provide feedback
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setLoading(false);
      onClose();
    }, 800);
  };

  const t = {
    title: locale === "hi" ? "कंसल्टेशन बुक करें" : "Book Your Consultation",
    subtitle: locale === "hi" ? "आशुतोष के साथ अपनी फिटनेस यात्रा शुरू करें" : "Start your fitness transformation with Coach Ashutosh",
    nameLabel: locale === "hi" ? "आपका नाम" : "Your Name",
    phoneLabel: locale === "hi" ? "फ़ोन नंबर" : "Phone Number",
    placeLabel: locale === "hi" ? "आपका शहर / स्थान" : "Your City / Place",
    goalLabel: locale === "hi" ? "आपको किस प्रकार की बॉडी या डाइट चाहिए?" : "What is your main fitness goal?",
    submitBtn: locale === "hi" ? "व्हाट्सएप पर इंक्वायरी भेजें" : "Send Inquiry on WhatsApp",
    loadingText: locale === "hi" ? "रीडायरेक्ट किया जा रहा है..." : "Redirecting to WhatsApp...",
    namePlaceholder: locale === "hi" ? "उदा. राहुल कुमार" : "e.g. John Doe",
    phonePlaceholder: locale === "hi" ? "उदा. 9876543210" : "e.g. +91 98765 43210",
    placePlaceholder: locale === "hi" ? "उदा. नई दिल्ली" : "e.g. New Delhi, India",
    goals: {
      fat_loss: locale === "hi" ? "चर्बी घटाना (Fat Loss)" : "Fat Loss / Conditioning",
      muscle_gain: locale === "hi" ? "मसल्स और ताकत बढ़ाना" : "Muscle Gain / Bulking",
      recomp: locale === "hi" ? "बॉडी रीकंपोजिशन (फैट लॉस + मसल)" : "Body Recomposition",
      diet_only: locale === "hi" ? "केवल कस्टमाइज्ड डाइट प्लान" : "Custom Diet Plan Only",
      personal_coaching: locale === "hi" ? "1-on-1 पर्सनल ट्रेनिंग कोचिंग" : "1-on-1 Personal Coaching",
    }
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
            className="relative w-full max-w-lg bg-[#161616] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden shadow-2xl z-[160]"
          >
            {/* Red Accent Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-accent rounded-sm inline-block"></span>
                  {t.title}
                </h3>
                <p className="text-text-secondary text-sm mt-1">{t.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-accent" />
                  {t.nameLabel} <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3 bg-[#0B0B0B] border border-white/10 hover:border-white/20 focus:border-accent/80 focus:ring-1 focus:ring-accent rounded-lg text-white outline-none transition-all"
                />
              </div>

              {/* Phone field */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  {t.phoneLabel} <span className="text-accent">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-3 bg-[#0B0B0B] border border-white/10 hover:border-white/20 focus:border-accent/80 focus:ring-1 focus:ring-accent rounded-lg text-white outline-none transition-all"
                />
              </div>

              {/* Place field */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {t.placeLabel} <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder={t.placePlaceholder}
                  className="w-full px-4 py-3 bg-[#0B0B0B] border border-white/10 hover:border-white/20 focus:border-accent/80 focus:ring-1 focus:ring-accent rounded-lg text-white outline-none transition-all"
                />
              </div>

              {/* Goal dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-accent" />
                  {t.goalLabel}
                </label>
                <div className="relative">
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0B0B0B] border border-white/10 hover:border-white/20 focus:border-accent/80 rounded-lg text-white outline-none appearance-none transition-all cursor-pointer"
                  >
                    <option value="fat_loss">{t.goals.fat_loss}</option>
                    <option value="muscle_gain">{t.goals.muscle_gain}</option>
                    <option value="recomp">{t.goals.recomp}</option>
                    <option value="diet_only">{t.goals.diet_only}</option>
                    <option value="personal_coaching">{t.goals.personal_coaching}</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-text-secondary">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-lg uppercase tracking-wider transition-all transform active:scale-[0.98] shadow-[0_0_20px_rgba(255,45,45,0.3)] disabled:opacity-75 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {t.loadingText}
                  </span>
                ) : (
                  <>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.981 14.119.957 11.5.957c-5.44 0-9.865 4.37-9.87 9.802 0 1.763.486 3.486 1.408 5.066L2.06 21.782l6.16-1.613z" />
                    </svg>
                    {t.submitBtn}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
