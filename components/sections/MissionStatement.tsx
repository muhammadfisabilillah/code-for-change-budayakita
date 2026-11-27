import { Reveal } from "@/components/reveal";

/** Quiet manifesto that bridges the hero and the main content. */
export function MissionStatement() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="border-b border-stone-200 dark:border-stone-800"
    >
      <Reveal className="mx-auto max-w-4xl px-6 py-24 text-center md:px-12 md:py-32">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Our mission
        </p>
        <h2
          id="mission-heading"
          className="text-3xl font-light leading-tight tracking-tight text-stone-900 dark:text-stone-50 md:text-5xl"
        >
          Warisan budaya adalah hak semua orang. Kami membangun ruang digital
          yang merayakan keberagaman dunia, dirancang dengan standar
          aksesibilitas tertinggi agar dapat dinikmati oleh siapa pun, tanpa
          batasan.
        </h2>
      </Reveal>
    </section>
  );
}
