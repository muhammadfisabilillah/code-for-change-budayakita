"use client";

import * as React from "react";
import Image from "next/image";
import {
  Accessibility,
  Captions,
  CheckCircle2,
  Hand,
  ImageOff,
  Info,
  Pause,
  Play,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CultureWithMeta } from "@/lib/types";

export function MediaViewer({ culture }: { culture: CultureWithMeta }) {
  const alt =
    culture.accessibility?.alt_text?.trim() ||
    `${culture.name} — ${culture.type} from ${culture.country?.name ?? "the world"}`;

  // The transcript is the text alternative for the media. Fall back to the
  // written description so a transcript is always available.
  const transcript =
    culture.accessibility?.transcript?.trim() || culture.detail_desc;

  const [showTranscript, setShowTranscript] = React.useState(false);
  const panelId = `accessibility-panel-${culture.id}`;
  const transcriptId = `transcript-${culture.id}`;

  // Speech-synthesis narration fallback (used when no audio file is provided).
  // Detected after mount to avoid an SSR/client hydration mismatch.
  const [canSpeak, setCanSpeak] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);

  React.useEffect(() => {
    setCanSpeak("speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!canSpeak) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      `${culture.name}. ${transcript}`,
    );
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const audioStatus = culture.audio_narration_url
    ? "Audio narration"
    : canSpeak
      ? "Speech narration"
      : "Text only";

  return (
    <div className="flex flex-col gap-6">
      {/* Primary image with DB-provided alt text */}
      <figure className="overflow-hidden rounded-lg border border-border bg-muted">
        <div className="relative aspect-[4/3] w-full">
          {culture.media_url ? (
            <Image
              src={culture.media_url}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-muted-foreground"
              role="img"
              aria-label={alt}
            >
              <ImageOff className="size-12" aria-hidden="true" />
            </div>
          )}
        </div>
        <figcaption className="border-t border-border bg-card p-3 text-sm text-muted-foreground">
          {alt}
        </figcaption>
      </figure>

      {/* Accessibility panel: every media item has an equivalent alternative */}
      <section
        aria-labelledby={panelId}
        className="rounded-lg border border-border bg-muted/30 p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 id={panelId} className="flex items-center gap-2 text-base font-semibold">
              <Accessibility className="size-5 text-primary" aria-hidden="true" />
              Accessibility panel
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose how you want to experience this tradition.
            </p>
          </div>
          <span className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold">
            WCAG 2.1 AA
          </span>
        </div>

        <ul aria-label="Available accessibility options" className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <li className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs">
            <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden="true" />
            <span>
              <span className="font-semibold">Alt text</span>
              <span className="text-muted-foreground"> · included</span>
            </span>
          </li>
          <li className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs">
            {culture.audio_narration_url || canSpeak ? (
              <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <Info className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            )}
            <span>
              <span className="font-semibold">Audio</span>
              <span className="text-muted-foreground"> · {audioStatus}</span>
            </span>
          </li>
          <li className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs">
            <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden="true" />
            <span>
              <span className="font-semibold">Transcript</span>
              <span className="text-muted-foreground"> · included</span>
            </span>
          </li>
        </ul>

        <div className="mt-4 flex flex-col gap-4">
          {/* Audio narration + transcript */}
          <section
            aria-labelledby={`media-controls-${culture.id}`}
            className="rounded-lg border border-border bg-card p-4"
          >
            <h3
              id={`media-controls-${culture.id}`}
              className="mb-3 flex items-center gap-2 text-sm font-semibold"
            >
              <Volume2 className="size-4 text-primary" aria-hidden="true" />
              Audio &amp; transcript
            </h3>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {culture.audio_narration_url ? (
                <audio
                  controls
                  className="w-full sm:max-w-sm"
                  aria-label={`Audio narration for ${culture.name}`}
                >
                  <source src={culture.audio_narration_url} />
                  Your browser does not support the audio element. The full
                  transcript is available below.
                </audio>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleSpeak}
                  disabled={!canSpeak}
                  aria-pressed={speaking}
                >
                  {speaking ? (
                    <>
                      <Pause aria-hidden="true" /> Stop narration
                    </>
                  ) : (
                    <>
                      <Play aria-hidden="true" /> Listen to narration
                    </>
                  )}
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => setShowTranscript((value) => !value)}
                aria-expanded={showTranscript}
                aria-controls={transcriptId}
              >
                <Captions aria-hidden="true" />
                {showTranscript ? "Hide transcript" : "Show transcript"}
              </Button>
            </div>

            {showTranscript && (
              <div
                id={transcriptId}
                className="mt-4 rounded-md border border-border bg-muted/50 p-4"
              >
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Transcript
                </h4>
                <p className="whitespace-pre-line text-sm leading-relaxed">
                  {transcript}
                </p>
              </div>
            )}
          </section>

          {/* Sign language interpretation */}
          <section
            aria-labelledby={`sign-${culture.id}`}
            className="rounded-lg border border-border bg-card p-4"
          >
            <h3
              id={`sign-${culture.id}`}
              className="mb-3 flex items-center gap-2 text-sm font-semibold"
            >
              <Hand className="size-4 text-primary" aria-hidden="true" />
              Sign language
            </h3>
            {culture.sign_language_gif_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={culture.sign_language_gif_url}
                alt={`Sign language interpretation of ${culture.name}. ${alt}`}
                className={cn(
                  "w-full rounded-md border border-border object-contain",
                )}
              />
            ) : (
              <p className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
                A sign language interpretation is not available for this entry
                yet. The full transcript above provides an equivalent text
                alternative.
              </p>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
