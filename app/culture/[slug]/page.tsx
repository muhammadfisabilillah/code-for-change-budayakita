import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Camera,
  Eye,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CultureCard } from "@/components/ui/CultureCard";
import { Reveal } from "@/components/reveal";

interface CultureDetail {
  slug: string;
  category: string;
  title: string;
  heroImage: string;
  photoCredit: string;
  photoCreditUrl: string;
  intro: string;
  body: string[];
  altText: string;
  transcript: string;
  audioUrl: string;
  relatedSlugs: string[];
}

const cultureDetails: CultureDetail[] = [
  {
    slug: "borobudur",
    category: "Indonesia • Architecture",
    title: "Candi Borobudur",
    heroImage:
      "https://images.unsplash.com/photo-1596401057633-54c8c1b61397?q=80&w=1600&auto=format&fit=crop",
    photoCredit: "Photo by Arun Mathias on Unsplash",
    photoCreditUrl: "https://unsplash.com",
    intro:
      "Bangun di atas bukit hijau Magelang, Borobudur bukan sekadar candi — ia adalah mandala raksasa yang mengajak pejalan kaki untuk naik menuju pencerahan, tingkat demi tingkat.",
    body: [
      "Dibangun pada abad ke-9 di bawah dinasti Syailendra, Candi Borobudur merupakan monumen Buddha terbesar di dunia. Terdiri dari sembilan tingkat platform yang dihiasi 2.672 panel relief dan 504 arca Buddha, bangunan ini dirancang sebagai sebuah mandala: representasi kosmos dalam bentuk batu andesit.",
      "Setiap pagi, kabut tipis menyelimuti candi saat matahari terbit di balik perbukitan Menoreh. Momen ini dianggap sebagai salah satu pengalaman visual paling ikonik di Asia Tenggara, dan menjadi alasan mengapa Borobudur terus menarik peziarah maupun pelancong dari seluruh dunia.",
      "Upaya konservasi berkelanjutan menjaga agar relief-reliefnya tetap dapat dibaca oleh generasi mendatang. Di balik setiap ukiran, ada cerita tentang perjalanan spiritual, kerja keras para perajin, dan keyakinan yang diwariskan lintas abad.",
    ],
    altText:
      "Pemandangan udara Candi Borobudur saat matahari terbit, dengan stupa-stupa batu andesit berbentuk lonceng yang dikelilingi kabut tipis dan perbukitan hijau di latar belakang. Langit berwarna gradasi jingga keunguan.",
    transcript:
      "Narasi: Candi Borobudur berdiri megah di tengah keheningan pagi. Relief-relief batu menceritakan perjalanan spiritual Siddhartha Gautama, sementara stupa-stupa berongga menampung arca Buddha yang sedang bermeditasi. Dari kaki candi, langkah demi langkah membawa pengunjung naik melalui tingkatan dunia keinginan, dunia bentuk, hingga dunia tanpa bentuk. Di puncaknya, sebuah stupa utama menandai titik pencerahan.",
    audioUrl: "",
    relatedSlugs: ["pendet-dance", "batik-writing"],
  },
  {
    slug: "pendet-dance",
    category: "Indonesia • Dance",
    title: "Tari Pendet",
    heroImage: "https://picsum.photos/seed/pendet-dance/1200/800",
    photoCredit: "Illustrative placeholder · BudayaKita Global",
    photoCreditUrl: "https://picsum.photos",
    intro:
      "Sebuah tarian sambutan dari Bali yang geraknya lembut, berurutan, dan penuh makna — seolah mengundang penonton untuk masuk ke dalam ruang upacara.",
    body: [
      "Tari Pendet berasal dari wilayah Bali dan awalnya dipertunjukkan sebagai bagian dari rangkaian upacara keagamaan. Para penari bergerak secara berkelompok, membawa bunga, dan menyajikannya sebagai simbol sambutan serta penghormatan.",
      "Gerakannya yang halus dan berulang memberi kesan tenang sekaligus khidmat. Seiring waktu, tarian ini juga tampil di luar konteks upacara, namun tetap menjaga kesan hormat dan kebersamaan yang menjadi intinya.",
    ],
    altText:
      "Ilustrasi pertunjukan tari Bali dengan para penari berpakaian tradisional bergerak secara berkelompok dalam formasi yang rapi.",
    transcript:
      "Narasi: Tari Pendet dibuka dengan gerakan tangan yang mengalir lembut, seolah menusun bunga yang akan dipersembahkan. Penari bergerak selaras, membentuk formasi yang rapat dan simetris. Musik gamelan mengiringi setiap pergantian sikap tubuh dengan tempo yang pelan dan teratur.",
    audioUrl: "",
    relatedSlugs: ["borobudur", "batik-writing"],
  },
  {
    slug: "batik-writing",
    category: "Indonesia • Art",
    title: "Batik Tulis",
    heroImage: "https://picsum.photos/seed/batik-writing/1200/800",
    photoCredit: "Illustrative placeholder · BudayaKita Global",
    photoCreditUrl: "https://picsum.photos",
    intro:
      "Satu helai kain, berbulan-bulan kesabaran. Batik tulis menyimpan jejak tangan yang tak bisa digantikan oleh mesin.",
    body: [
      "Batik tulis dibuat dengan canting, alat kecil bermata tembaga yang meneteskan lilin malam mengikuti goresan tangan perajin. Setiap motif dilukis berulang kali, lalu kain dicelup dan lilin dibuang untuk menghasilkan kontras warna.",
      "Motif batik sering kali menyimpan makna sosial dan filosofi tertentu. Ada pola yang melambangkan kemakmuran, ada pula yang mengisahkan perjalanan hidup atau status sosial dalam komunitasnya.",
    ],
    altText:
      "Ilustrasi sehelai kain batik dengan motif rumit yang dibuat menggunakan canting, memperlihatkan goresan lilin dan warna alami.",
    transcript:
      "Narasi: Perajin memegang canting dengan ujung yang runcing, meneteskan lilin panas di atas kain putih. Goresan demi goresan membentuk pola yang akan menahan warna saat kain dicelup. Proses ini membutuhkan ketelitian tinggi dan dapat berlangsung selama berminggu-minggu untuk satu helai kain.",
    audioUrl: "",
    relatedSlugs: ["borobudur", "pendet-dance"],
  },
  {
    slug: "kyoto-tea-ceremony",
    category: "Jepang • Tradition",
    title: "Upacara Teh Kyoto",
    heroImage:
      "https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?q=80&w=1600&auto=format&fit=crop",
    photoCredit: "Illustrative photograph · BudayaKita Global",
    photoCreditUrl: "https://unsplash.com",
    intro:
      "Dalam ruang teh Kyoto, setiap gerakan diukur oleh keheningan. Seduhannya sederhana, tetapi perhatian yang menyertainya menjadi inti dari upacara ini.",
    body: [
      "Upacara teh Jepang, atau chanoyu, dikembangkan oleh para biksu Zen dan kemudian disempurnakan oleh para master teh. Filosofinya dikenal sebagai ichi-go ichi-e: satu kesempatan, satu pertemuan yang tidak akan terulang.",
      "Setiap peralatan dipilih sesuai musim, dan urutan gerakannya mengikuti pola yang telah diwariskan selama berabad-abad. Yang dihadirkan bukan sekadar minuman, melainkan sebuah ruang untuk hadir sepenuhnya.",
    ],
    altText:
      "Suasana ruang teh Kyoto dengan mangkuk teh keramik dan alat seduh bambu yang ditata rapi di atas meja kayu rendah.",
    transcript:
      "Narasi: Air mendidih perlahan dalam ketel besi. Bambu whisk dikumpulkan dengan gerakan lembut, lalu teh hijau dikocok hingga berbusa halus. Mangkuk teh diputar sedikit sebelum diminum, sebagai tanda penghargaan terhadap bentuknya dan terhadap orang yang menyajikannya.",
    audioUrl: "",
    relatedSlugs: ["borobudur", "giza-pyramids"],
  },
  {
    slug: "giza-pyramids",
    category: "Mesir • History",
    title: "Piramida Giza",
    heroImage:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73e6e?q=80&w=1600&auto=format&fit=crop",
    photoCredit: "Illustrative photograph · BudayaKita Global",
    photoCreditUrl: "https://unsplash.com",
    intro:
      "Di tepi gurun, piramida Giza berdiri sebagai jejak ambisi manusia yang menantang waktu — tiga monumen yang masih menyimpan pertanyaan hingga hari ini.",
    body: [
      "Piramida Agung Giza dibangun sekitar 2.500 tahun lalu sebagai makam Firaun Khufu. Bersama piramida Khafre dan Menkaure, kompleks ini menjadi bagian dari lanskap pemakaman kerajaan yang mencerminkan kepercayaan Mesir kuno akan kehidupan setelah mati.",
      "Presisi konstruksinya masih menjadi subjek kajian: blok-blok batu kapur diatur sedemikian rupa sehingga sudut dan orientasinya selaras dengan langit malam. Hingga kini, situs ini tetap menjadi pengingat akan kemampuan teknik dan organisasi kerja masa lampau.",
    ],
    altText:
      "Tiga piramida Giza menjulang di atas pasir gurun dengan langit cerah di latar belakang dan bayangan yang panjang di permukaan pasir.",
    transcript:
      "Narasi: Piramida Agung Giza menjulang di atas dataran gurun. Permukaannya terdiri dari ribuan blok batu yang tersusun dengan presisi tinggi. Di kejauhan, dua piramida lainnya melengkapi kompleks ini, menciptakan lanskap yang telah dikenali manusia selama ribuan tahun.",
    audioUrl: "",
    relatedSlugs: ["kyoto-tea-ceremony", "borobudur"],
  },
];

function findCulture(slug: string) {
  return cultureDetails.find((culture) => culture.slug === slug);
}

export function generateStaticParams() {
  return cultureDetails.map((culture) => ({ slug: culture.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const culture = findCulture(params.slug);
  if (!culture) return { title: "Culture not found" };
  return { title: culture.title, description: culture.intro };
}

export default function CultureDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const culture = findCulture(params.slug);
  if (!culture) notFound();

  const related = culture.relatedSlugs
    .map((slug) => findCulture(slug))
    .filter((item): item is CultureDetail => Boolean(item));

  return (
    <div className="page-shell min-h-screen bg-stone-50 dark:bg-stone-950">
      <Link
        href="/"
        className="back-button fixed left-6 top-24 z-40 rounded-sm border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 md:left-12"
      >
        ← Kembali
      </Link>

      <section className="relative h-[60vh] overflow-hidden md:h-[80vh]">
        <Image
          src={culture.heroImage}
          alt={culture.altText}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-transparent to-stone-900/60"
        />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-stone-300">
            {culture.category}
          </p>
          <h1 className="max-w-4xl text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
            {culture.title}
          </h1>
        </div>

        <p className="absolute bottom-6 right-6 z-10 text-[10px] italic text-white/70">
          {culture.photoCredit}
        </p>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <p className="mb-12 text-xl font-light leading-relaxed text-stone-700 first-letter:mr-2 first-letter:text-5xl first-letter:font-light first-letter:text-stone-900 dark:text-stone-300 dark:first-letter:text-stone-100 md:text-2xl">
            {culture.intro}
          </p>
          <div className="space-y-6 text-base leading-[1.8] text-stone-600 dark:text-stone-400 md:text-lg">
            {culture.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <section
            aria-labelledby="accessibility-heading"
            className="mt-16 border-t border-stone-200 pt-12 dark:border-stone-800"
          >
            <h2
              id="accessibility-heading"
              className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400"
            >
              Accessibility &amp; context
            </h2>

            <div className="grid grid-cols-1 gap-10">
              <div className="flex gap-4">
                <Eye
                  className="mt-0.5 size-5 shrink-0 text-stone-400"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="mb-2 text-sm font-medium text-stone-900 dark:text-stone-100">
                    Visual description
                  </h3>
                  <p className="text-base leading-relaxed text-stone-600 dark:text-stone-400">
                    {culture.altText}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Volume2
                  className="mt-0.5 size-5 shrink-0 text-stone-400"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 text-sm font-medium text-stone-900 dark:text-stone-100">
                    Narration transcript
                  </h3>
                  {culture.audioUrl && (
                    <Button asChild variant="outline" className="mb-4 rounded-sm">
                      <a href={culture.audioUrl} aria-label="Putar narasi audio">
                        Putar narasi
                      </a>
                    </Button>
                  )}
                  <div className="max-h-64 overflow-y-auto rounded-sm border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-900">
                    <p className="text-base leading-relaxed text-stone-600 dark:text-stone-400">
                      {culture.transcript}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Camera
                  className="mt-0.5 size-5 shrink-0 text-stone-400"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="mb-2 text-sm font-medium text-stone-900 dark:text-stone-100">
                    Image attribution
                  </h3>
                  <p className="text-base leading-relaxed text-stone-600 dark:text-stone-400">
                    <a
                      href={culture.photoCreditUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-stone-300 underline-offset-4 transition-colors duration-500 ease-out hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {culture.photoCredit}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            aria-labelledby="related-heading"
            className="mt-24 border-t border-stone-200 pt-12 dark:border-stone-800"
          >
            <h2
              id="related-heading"
              className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400"
            >
              You may also explore
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {related.map((item) => (
                <CultureCard
                  key={item.slug}
                  category={item.category}
                  title={item.title}
                  image={item.heroImage}
                  alt={item.altText}
                  href={`/culture/${item.slug}`}
                />
              ))}
            </div>
          </section>
        </Reveal>
      </article>
    </div>
  );
}
