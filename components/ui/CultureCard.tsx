import Image from "next/image";
import Link from "next/link";

interface CultureCardProps {
  category: string;
  title: string;
  image: string;
  /** Describes the actual photograph for screen-reader users. */
  alt: string;
  href?: string;
}

/** Magazine-style heritage card with a quiet gradient and visible focus. */
export function CultureCard({
  category,
  title,
  image,
  alt,
  href = "/cultures",
}: CultureCardProps) {
  return (
    <article
      role="article"
      aria-label={`Jelajahi ${title}`}
      className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-sm border border-stone-200 bg-stone-100 focus-within:ring-2 focus-within:ring-stone-400 focus-within:ring-offset-2 dark:border-stone-800 dark:bg-stone-900"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-stone-300">
          {category}
        </p>
        <h3 className="text-xl font-normal text-white">{title}</h3>
      </div>

      <Link
        href={href}
        className="absolute inset-0 z-20 rounded-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
      >
        <span className="sr-only">Jelajahi {title}</span>
      </Link>
    </article>
  );
}
