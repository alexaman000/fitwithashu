"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLocale } from "next-intl";

export default function VoiceWelcome() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const locale = useLocale();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate HTMLAudioElement
    if (typeof window !== "undefined") {
      const audio = new Audio("/audio/welcome.mp3");
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        setHasPlayed(true);
        sessionStorage.setItem("voicePlayed", "true");
      };
      audio.onerror = () => {
        setIsPlaying(false);
      };
      
      audioRef.current = audio;
    }

    const played = sessionStorage.getItem("voicePlayed");
    if (played) {
      setHasPlayed(true);
    }

    const handleFirstInteraction = () => {
      // Trigger voice welcome on first click/keypress
      playVoice(false);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const playVoice = (force = false) => {
    if ((!force && hasPlayed) || !audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    // Play welcome audio
    audioRef.current.play().then(() => {
      setHasPlayed(true);
      sessionStorage.setItem("voicePlayed", "true");
    }).catch(() => {
      setIsPlaying(false);
    });
  };

  const handleSpeakerClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering any other click events
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      // Force replay
      playVoice(true);
    }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-3"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Premium Tooltip Badge */}
      <div 
        className={`px-4 py-2 rounded-full bg-secondary/95 border border-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xl transition-all duration-300 transform ${
          showTooltip && !isPlaying ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        {locale === "hi" ? "आशुतोष की आवाज़ सुनें" : "Hear Coach's Voice"}
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={handleSpeakerClick}
        className={`p-4 rounded-full backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(255,45,45,0.1)] hover:shadow-[0_0_25px_rgba(255,45,45,0.35)] border ${
          isPlaying 
            ? "bg-accent border-accent text-white scale-110" 
            : "bg-[#161616]/90 border-white/10 hover:border-accent/50 text-text-secondary hover:text-white"
        }`}
        aria-label="Toggle Coach Voice Welcome"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 animate-pulse" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
