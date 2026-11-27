import { CultureCard } from "@/components/ui/CultureCard";
import { Reveal } from "@/components/reveal";

interface FeaturedCulture {
  slug: string;
  category: string;
  title: string;
  image: string;
  alt: string;
}

/** Static showcase used until the database-backed grid is connected. */
const featuredCultures: FeaturedCulture[] = [
  {
    slug: "borobudur",
    category: "Indonesia • Architecture",
    title: "Candi Borobudur",
    image:
      "https://images.unsplash.com/photo-1596401057633-54c8c1b61397?q=80&w=800&auto=format&fit=crop",
    alt: "The stepped stone tiers and stupas of Borobudur temple rising above a green landscape.",
  },
  {
    slug: "kyoto-tea-ceremony",
    category: "Jepang • Tradition",
    title: "Upacara Teh Kyoto",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?q=80&w=800&auto=format&fit=crop",
    alt: "A quiet Kyoto tea room with a ceramic tea bowl and bamboo whisk arranged for a tea ceremony.",
  },
  {
    slug: "giza-pyramids",
    category: "Mesir • History",
    title: "Piramida Giza",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73e6e?q=80&w=800&auto=format&fit=crop",
    alt: "The Great Pyramids of Giza rising above the desert sands under a clear sky.",
  },
];

export function FeaturedGrid() {
  return (
    <section aria-labelledby="featured-heading">
      <h2
        id="featured-heading"
        className="mx-auto mb-12 max-w-7xl px-6 text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 md:px-12"
      >
        Explore heritage
      </h2>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-32 md:grid-cols-2 md:gap-12 md:px-12 lg:grid-cols-3">
        {featuredCultures.map((culture, index) => (
          <Reveal key={culture.title} delay={index * 0.1}>
            <CultureCard
              category={culture.category}
              title={culture.title}
              image={culture.image}
              alt={culture.alt}
              href={`/culture/${culture.slug}`}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
