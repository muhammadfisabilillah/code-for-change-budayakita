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
    image: "/images/cultures/borobudur.jpg",
    alt: "A seated Buddha statue inside a perforated stone stupa at Borobudur, with bell-shaped stupas and visitors behind it under a bright sky.",
  },
  {
    slug: "kyoto-tea-ceremony",
    category: "Jepang • Tradition",
    title: "Upacara Teh Kyoto",
    image: "/images/cultures/upacara-teh-tokyo.jpg",
    alt: "A person in an orange floral kimono preparing tea, reaching toward a black cast-iron kettle on a woven tray beside a bamboo whisk.",
  },
  {
    slug: "giza-pyramids",
    category: "Mesir • History",
    title: "Piramida Giza",
    image: "/images/cultures/piramida-giza.jpg",
    alt: "A camel resting on pale rocky sand in front of a great pyramid under a deep blue sky.",
  },
  {
    slug: "bharatanatyam",
    category: "India • Dance",
    title: "Bharatanatyam",
    image: "/images/cultures/bharatanatyam.jpg",
    alt: "A Bharatanatyam dancer in a vivid red costume performing a raised-hand gesture and lifted-leg pose under warm stage lighting against a dark temple backdrop.",
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
