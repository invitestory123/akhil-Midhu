import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio("./music.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // When envelope opens or user interacts, start playback
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !hasInteracted) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy until gesture
        });
    }
  }, [autoPlayTrigger, hasInteracted]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  return (
    <div className="fixed top-5 right-5 z-40">
      <motion.button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        className="group flex items-center gap-2.5 rounded-full border border-gold/40 bg-paper/90 px-3.5 py-2 shadow-[0_8px_24px_-10px_rgba(60,45,25,0.45)] backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-paper"
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <span className="relative flex size-5 items-center justify-center text-ink">
          {isPlaying ? (
            <motion.div
              className="flex items-end justify-center gap-0.5 h-3.5"
              aria-hidden="true"
            >
              <motion.span
                className="w-0.5 rounded-full bg-gold"
                animate={{ height: ["40%", "100%", "40%"] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="w-0.5 rounded-full bg-ink"
                animate={{ height: ["90%", "30%", "90%"] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
              />
              <motion.span
                className="w-0.5 rounded-full bg-gold"
                animate={{ height: ["30%", "100%", "30%"] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
            </motion.div>
          ) : (
            <Music className="size-3.5 text-sepia" />
          )}
        </span>

        <span className="caps text-[0.52rem] text-ink font-medium tracking-widest hidden sm:inline">
          {isPlaying ? "Music Playing" : "Play Music"}
        </span>

        <span className="text-sepia/80 group-hover:text-ink transition-colors">
          {isPlaying ? (
            <Volume2 className="size-3.5 text-gold" />
          ) : (
            <VolumeX className="size-3.5 text-sepia/60" />
          )}
        </span>
      </motion.button>
    </div>
  );
}
