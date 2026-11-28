"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  /** Text that will be read aloud. */
  text: string;
  /** BCP-47 language tag for the utterance. Defaults to US English. */
  lang?: string;
  /** Speech rate; 0.9 is slightly slower and easier to follow. */
  rate?: number;
  className?: string;
}

/** Minimalist, keyboard-friendly text-to-speech control (Web Speech API). */
export function AudioPlayer({
  text,
  lang = "en-US",
  rate = 0.9,
  className,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  // Optimistic default keeps the button in SSR output; the effect corrects it
  // after mount for browsers without speechSynthesis.
  const [isSupported, setIsSupported] = React.useState(true);
  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);

  React.useEffect(() => {
    setIsSupported(
      typeof window !== "undefined" && "speechSynthesis" in window,
    );

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggle = React.useCallback(() => {
    if (!isSupported || !text.trim()) return;

    const synth = window.speechSynthesis;

    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      synth.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
  }, [isSupported, isPaused, isPlaying, lang, rate, text]);

  if (!isSupported) {
    return (
      <p className="rounded-sm border border-stone-200 bg-stone-50 p-4 text-sm leading-relaxed text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
        Text-to-speech is not supported in this browser. Please read the
        transcript below.
      </p>
    );
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? "Pause narration" : "Play narration"}
        aria-pressed={isPlaying}
        className="tts-button relative inline-flex size-12 items-center justify-center rounded-full bg-stone-100 text-stone-900 transition-all duration-300 hover:bg-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700"
      >
        {isPlaying && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 animate-pulse rounded-full border border-[hsl(var(--accent))] motion-reduce:animate-none"
          />
        )}
        {isPlaying ? (
          <Pause className="size-5" aria-hidden="true" />
        ) : (
          <Play className="size-5" aria-hidden="true" />
        )}
      </button>

      <p className="text-sm text-stone-600 dark:text-stone-400" aria-live="polite">
        {isPlaying
          ? "Playing narration…"
          : isPaused
            ? "Narration paused"
            : "Listen to the narration"}
      </p>
    </div>
  );
}
