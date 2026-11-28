import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Camera,
  Eye,
  Volume2,
} from "lucide-react";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
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
    heroImage: "/images/cultures/borobudur.jpg",
    photoCredit: "Photo · BudayaKita Global collection",
    photoCreditUrl: "",
    intro:
      "Bangun di atas bukit hijau Magelang, Borobudur bukan sekadar candi — ia adalah mandala raksasa yang mengajak pejalan kaki untuk naik menuju pencerahan, tingkat demi tingkat.",
    body: [
      "Dibangun pada abad ke-9 di bawah dinasti Syailendra, Candi Borobudur merupakan monumen Buddha terbesar di dunia. Terdiri dari sembilan tingkat platform yang dihiasi 2.672 panel relief dan 504 arca Buddha, bangunan ini dirancang sebagai sebuah mandala: representasi kosmos dalam bentuk batu andesit.",
      "Setiap pagi, kabut tipis menyelimuti candi saat matahari terbit di balik perbukitan Menoreh. Momen ini dianggap sebagai salah satu pengalaman visual paling ikonik di Asia Tenggara, dan menjadi alasan mengapa Borobudur terus menarik peziarah maupun pelancong dari seluruh dunia.",
      "Upaya konservasi berkelanjutan menjaga agar relief-reliefnya tetap dapat dibaca oleh generasi mendatang. Di balik setiap ukiran, ada cerita tentang perjalanan spiritual, kerja keras para perajin, dan keyakinan yang diwariskan lintas abad.",
    ],
    altText:
      "A seated Buddha statue inside a perforated stone stupa at Borobudur, with several bell-shaped stupas and visitors in the background under a bright, hazy sky.",
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
    heroImage: "/images/cultures/upacara-teh-tokyo-detail.jpg",
    photoCredit: "Photo · BudayaKita Global collection",
    photoCreditUrl: "",
    intro:
      "Dalam ruang teh Kyoto, setiap gerakan diukur oleh keheningan. Seduhannya sederhana, tetapi perhatian yang menyertainya menjadi inti dari upacara ini.",
    body: [
      "Upacara teh Jepang, atau chanoyu, dikembangkan oleh para biksu Zen dan kemudian disempurnakan oleh para master teh. Filosofinya dikenal sebagai ichi-go ichi-e: satu kesempatan, satu pertemuan yang tidak akan terulang.",
      "Setiap peralatan dipilih sesuai musim, dan urutan gerakannya mengikuti pola yang telah diwariskan selama berabad-abad. Yang dihadirkan bukan sekadar minuman, melainkan sebuah ruang untuk hadir sepenuhnya.",
    ],
    altText:
      "A woman in an orange floral kimono kneeling on a tatami mat in a shoji-screened tea room, with a black cast-iron kettle, bamboo whisk, and a red teacup arranged on a woven tray beside her.",
    transcript:
      "Narasi: Air mendidih perlahan dalam ketel besi. Bambu whisk dikumpulkan dengan gerakan lembut, lalu teh hijau dikocok hingga berbusa halus. Mangkuk teh diputar sedikit sebelum diminum, sebagai tanda penghargaan terhadap bentuknya dan terhadap orang yang menyajikannya.",
    audioUrl: "",
    relatedSlugs: ["borobudur", "giza-pyramids"],
  },
  {
    slug: "giza-pyramids",
    category: "Mesir • History",
    title: "Piramida Giza",
    heroImage: "/images/cultures/piramida-giza.jpg",
    photoCredit: "Photo · BudayaKita Global collection",
    photoCreditUrl: "",
    intro:
      "Di tepi gurun, piramida Giza berdiri sebagai jejak ambisi manusia yang menantang waktu — tiga monumen yang masih menyimpan pertanyaan hingga hari ini.",
    body: [
      "Piramida Agung Giza dibangun sekitar 2.500 tahun lalu sebagai makam Firaun Khufu. Bersama piramida Khafre dan Menkaure, kompleks ini menjadi bagian dari lanskap pemakaman kerajaan yang mencerminkan kepercayaan Mesir kuno akan kehidupan setelah mati.",
      "Presisi konstruksinya masih menjadi subjek kajian: blok-blok batu kapur diatur sedemikian rupa sehingga sudut dan orientasinya selaras dengan langit malam. Hingga kini, situs ini tetap menjadi pengingat akan kemampuan teknik dan organisasi kerja masa lampau.",
    ],
    altText:
      "A camel resting on pale rocky sand in front of a great pyramid under a deep blue sky.",
    transcript:
      "Narasi: Piramida Agung Giza menjulang di atas dataran gurun. Permukaannya terdiri dari ribuan blok batu yang tersusun dengan presisi tinggi. Di kejauhan, dua piramida lainnya melengkapi kompleks ini, menciptakan lanskap yang telah dikenali manusia selama ribuan tahun.",
    audioUrl: "",
    relatedSlugs: ["kyoto-tea-ceremony", "borobudur"],
  },
  {
    slug: "bharatanatyam",
    category: "India • Dance",
    title: "Bharatanatyam",
    heroImage: "/images/cultures/bharatanatyam.jpg",
    photoCredit: "Photo · BudayaKita Global collection",
    photoCreditUrl: "",
    intro:
      "Satu tubuh bisa menjadi seluruh cerita. Dalam Bharatanatyam, gerak kecil jari menyimpan makna, dan setiap pijakan mengubah lantai menjadi panggung penghayatan.",
    body: [
      "Bharatanatyam adalah bentuk tari klasik tertua dari Tamil Nadu, India Selatan. Akarnya dapat ditelusuri lebih dari dua ribu tahun lalu, ketika tarian ini dipersembahkan di kuil sebagai bagian dari ibadah.",
      "Tari ini dikenal karena kombinasi mudra — gesture tangan yang sarat makna — serta ekspresi wajah dan irama kaki yang presisi. Penari menguasai keseimbangan antara bhava (perasaan), raga (keindahan), dan tala (ritme).",
      "Kostum merah dengan perhiasan emas, rambut yang dihias, dan pencahayaan hangat sering menjadi ciri khas pertunjukannya. Di balik keindahan visual itu, ada latihan bertahun-tahun untuk menjaga setiap gerak tetap tajam dan penuh arti.",
    ],
    altText:
      "A Bharatanatyam dancer in a vivid red costume performing a raised-hand gesture and lifted-leg pose under warm stage lighting against a dark temple backdrop.",
    transcript:
      "Narasi: Seorang penari Bharatanatyam berdiri dalam pencahayaan hangat di atas panggung gelap. Tangannya membentuk mudra, satu telapak menghadap ke depan sementara kaki kirinya terangkat dalam keseimbangan yang mantap. Gerak kecil jari menceritakan makna yang lebih besar daripada kata, sementara irama kaki menandai setiap pergantian fase dalam tarian.",
    audioUrl: "",
    relatedSlugs: ["borobudur", "pendet-dance"],
  },
  {
    slug: "tari-saman",
    category: "Indonesia • Dance",
    title: "Tari Saman",
    heroImage: "https://picsum.photos/seed/tari-saman/1200/800",
    photoCredit: "Illustrative placeholder · BudayaKita Global",
    photoCreditUrl: "",
    intro:
      "Baris yang diam menjadi badai. Dalam Tari Saman, sembilan orang bergerak seperti satu tubuh dari ribuan tangan.",
    body: [
      "Tari Saman, atau tari piring dari Aceh, adalah tarian sakral yang berasal dari masyarakat Gayo. Gaya ini dikenal dengan nama 'Dance of a Thousand Hands' karena penari yang duduk berderet bergerak serentak dengan presisi tinggi.",
      "Irama dihasilkan dari tepukan tangan, pat pada dada, dan ayunan tubuh yang cepat namun tetap teratur. Musiknya dimulai pelan lalu menaikkan tempo menuju kemudian berakhir tiba-tiba.",
      "Tari ini sering dipertunjukkan pada upacara besar dan mewakili semangat gotong royong. Latihan ketat dan penghafalan gerak membuatnya terasa seperti satu kehendak dari banyak tubuh.",
    ],
    altText:
      "An illustrative photograph representing Tari Saman, a synchronized Indonesian kneeling dance with rapid clapping.",
    transcript:
      "Narasi: Baris penari Aceh duduk rapat bahu dengan bahu. Tangan naik bersama, bertepuk cepat, dan tubuh berayun seperti satu entitas. Tarian dimulai perlahan, membangun tegangan, hingga puncak yang mengejutkan sebelum berhenti.",
    audioUrl: "",
    relatedSlugs: ["borobudur", "rendang"],
  },
  {
    slug: "rendang",
    category: "Indonesia • Food",
    title: "Rendang",
    heroImage: "/images/cultures/rendang.jpg",
    photoCredit: "Photo · BudayaKita Global collection",
    photoCreditUrl: "",
    intro:
      "Bukan sekadar masakan, Rendang adalah proses. Beberapa jam dicampur bumbu, diamati, dan dikelola hingga menjadi resep yang kuat.",
    body: [
      "Rendang adalah hidangan Minangkabau dari Sumatera Barat. Daging sapi dimasak perlahan dalam santan kelapa dan pasta rempah kaya, seperti lengkuas, kunyit, ketumbar, dan cabai, hingga kering meresap.",
      "Teknik ini bukan sekadar untuk rasa, tapi juga untuk daya simpan. Masakan dituang dalam panci dan diamati selama jam; kentalnya santan berubah jadi lapisan cokelat keemasan di sekeliling daging.",
      "Rendang sering menjadi pusat acara keluarga. Di Minangkabau, ada ungkapan 'rendang adat', menunjukkan kesakralan dan keharusan keluarga membawa hidangan ini dalam momen penting.",
    ],
    altText:
      "A close-up of dark, caramelized beef rendang coated in a rich spice paste on a white ceramic plate.",
    transcript:
      "Narasi: Daging sapi tua dimasak dengan santan kelapa dan pasta rempah selama berjam-jam. Panci diputar perlahan; santan menguap hingga tinggal lapisan cokelat keemasan. Keseimbangan gurih, manis, dan pedas adalah kunci rendang.",
    audioUrl: "",
    relatedSlugs: ["tari-saman", "borobudur"],
  },
  {
    slug: "ikebana",
    category: "Jepang • Art",
    title: "Ikebana",
    heroImage: "/images/cultures/ikebana.jpg",
    photoCredit: "Photo · BudayaKita Global collection",
    photoCreditUrl: "",
    intro:
      "Di ruang yang tenang, satu cabang bisa menjadi cerita. Ikebana mengajarkan seni berhenti.",
    body: [
      "Ikebana, atau kado (‘jalan bunga’), adalah seni menata bunga khas Jepang. Fokusnya bukan kepadatan bunga, tapi keseimbangan, asimetri, dan ruang kosong.",
      "Tiap tangkai, daun, dan bunga diletakkan dengan maksud untuk mencerminkan bentuk dalam alam. Aliran seperti rikka, kyohi, dan ohara memiliki aturan berbeda, namun sama-sama menghargai minimalisme.",
      "Hasilnya bukan hanya indah, tapi juga kontemplatif: praktisi dilatih melihat hubungan antara alam, ruang, dan manusia.",
    ],
    altText:
      "A minimalist ikebana arrangement of slender branches in a tall glass vase, casting delicate shadows on a warm wall beneath a framed calligraphy panel.",
    transcript:
      "Narasi: Tangkai lurus bersanding dengan daun pendek di vasa tinggi. Ruang kosong sengaja ditinggalkan. Setiap perubahan kecil atau letak tangkai berubah karena estetika dan arti.",
    audioUrl: "",
    relatedSlugs: ["kyoto-tea-ceremony", "edomae-sushi"],
  },
  {
    slug: "edomae-sushi",
    category: "Jepang • Food",
    title: "Edomae Sushi",
    heroImage: "https://picsum.photos/seed/edomae-sushi/1200/800",
    photoCredit: "Illustrative placeholder · BudayaKita Global",
    photoCreditUrl: "",
    intro:
      "Di tepi Tokyo, sushi menjadi seni presisi. Berabad-abad, para chef menyempurnakan seimbangnya nasi dan laut.",
    body: [
      "Edomae, nama lama Tokyo, menandai sushi yang berkembang di teluk ini. Ikan laut dan seafood diawetkan atau dimasak perlahan supaya rasanya padat.",
      "Nasi vinegar dibentuk manual, ditutup lembut, lalu diberi sedikit glaze soya. Portions kecil untuk dinikmati satu-satu, tanpa kesalahan rasa.",
      "Filosofinya seasonal: bahan dipilih menurut musim, chef menghormati karakter ikan, dan hasilnya dihidangkan secepat mungkin.",
    ],
    altText:
      "An illustrative photograph representing Edomae sushi nigiri on a ceramic plate.",
    transcript:
      "Narasi: Nasi vinegar hangat dibentuk manual dan ditutup ikan laut yang segar. Portions kecil. Semakin sederhana, semakin penting karakter ikan dan presisi chef.",
    audioUrl: "",
    relatedSlugs: ["kyoto-tea-ceremony", "ikebana"],
  },
  {
    slug: "jarabe-tapatios",
    category: "Meksiko • Dance",
    title: "Jarabe Tapatío",
    heroImage: "/images/cultures/jarabe-tapatios.jpg",
    photoCredit: "Photo · BudayaKita Global collection",
    photoCreditUrl: "",
    intro:
      "Berjalan melingkar, tersenyum, dan kaki tepuk. Jarabe Tapatío menggambarkan percintaan dengan tarian.",
    body: [
      "Jarabe Tapatío, sering disebut ‘Mexican Hat Dance’, adalah tarian nasional Meksiko. Pasangan laki-laki dan perempuan berputar berlawanan arah, kaki berlangkah presisi.",
      "Awalnya tarian rakyat dari Jalisco. Kostum dan musiknya kini mewakili identitas mestizo Meksiko. Gerak kecil kaki mengikuti bantuan, lalu berhenti di irama.",
      "Sombrero, kostum bordir, dan musik ritmis membuatnya dikenal seluruh dunia sebagai wajah budaya Meksiko.",
    ],
    altText:
      "A Mexican rider in an embroidered navy dress and wide-brimmed sombrero sitting atop a tan horse against a soft blue sky.",
    transcript:
      "Narasi: Pasangan berputar melingkar. Kaki kanan tepuk perlahan. Kostum bordir bergerak halus. Tarian mengisahkan ketegangan dan kesopanan antara pasangan dengan langkah teratur.",
    audioUrl: "",
    relatedSlugs: ["mole-poblano", "borobudur"],
  },
  {
    slug: "mole-poblano",
    category: "Meksiko • Food",
    title: "Mole Poblano",
    heroImage: "https://picsum.photos/seed/mole-poblano/1200/800",
    photoCredit: "Illustrative placeholder · BudayaKita Global",
    photoCreditUrl: "",
    intro:
      "Rasa kompleks dari Puebla: cabai, rempah, kacang, dan sedikit cokelat menjadi satu.",
    body: [
      "Mole Poblano adalah saus legendaris dari Puebla. Bahan dasarnya cabai, rempah, kacang, biji, dan kadang cokelat.",
      "Prosesnya panjang: tiap bahan dipanggang atau digoreng, dikupas, dikayakan, dan dikocok sampai halus. Rasa manis, pedas, dan asin berlapis.",
      "Mole sering disajikan pada tuna, turkey, atau ayam untuk acara keluarga dan hari besar.",
    ],
    altText:
      "An illustrative photograph representing Mole Poblano sauce served over chicken.",
    transcript:
      "Narasi: Cabai, rempah, kacang, dan cokelat dipadu menjadi saus halus. Pedas berlapis dengan manis dan asin. Hidangan dikenal dari Puebla.",
    audioUrl: "",
    relatedSlugs: ["jarabe-tapatios", "borobudur"],
  },
  {
    slug: "opera-buffa",
    category: "Italia • Art",
    title: "Opera Buffa",
    heroImage: "https://picsum.photos/seed/opera-buffa/1200/800",
    photoCredit: "Illustrative placeholder · BudayaKita Global",
    photoCreditUrl: "",
    intro:
      "Komedi dalam musik. Opera buffa menampilkan kehidupan sederhana lewat dialog cepat dan akhir yang berlebihan.",
    body: [
      "Opera buffa, atau ‘comic opera’, berkembang di Italia abad 18. Berbeda dari opera seria, ia memakai tokoh sehari-hari, cerita ringan, dan patter cepat.",
      "Musiknya sering menyelimuti aria dan ensemble. Komedi lahir dari kesalahpahaman, kekeliruan, dan hubungan keluarga.",
      "Gaya ini memengaruhi banyak karya kemudian hingga modern opera-comique.",
    ],
    altText:
      "An illustrative photograph representing an opera buffa stage scene.",
    transcript:
      "Narasi: Opera buffa mencampur kehidupan biasa dengan musik. Tokoh palsu dan patter cepat membuat komedi musikal.",
    audioUrl: "",
    relatedSlugs: ["borobudur", "ikebana"],
  },
  {
    slug: "adire-textile",
    category: "Nigeria • Art",
    title: "Adire Textile",
    heroImage: "/images/cultures/adire-textile.jpg",
    photoCredit: "Photo · BudayaKita Global collection",
    photoCreditUrl: "",
    intro:
      "Kain yang ditarik, dicelup, dan berbisik. Adire menahan warna supaya pola lahir.",
    body: [
      "Adire adalah teknik resist-dyeing dari masyarakat Yoruba di Nigeria. Kain diikat, disumbat, atau digambar dengan pasta singkong sebelum dicelup indigo.",
      "Setelah warna dibuka, hasilnya pola biru-putih yang rumit. Pola tiap kelompok memiliki nama dan makna tertentu.",
      "Adire berkembang sebagai karya seni tekstil dan juga benda sosial. Tiap helai adalah kombinasi kesabaran, teknik, dan keindahan.",
    ],
    altText:
      "A woman wearing a warm orange and cream patterned Adire textile with a sheer white lace headwrap, smiling outdoors in soft daylight.",
    transcript:
      "Narasi: Kain putih digores sebelum dicelup indigo. Bagian yang dijaga tidak berwarna. Pola muncul hingga menjadi tekstil halus.",
    audioUrl: "",
    relatedSlugs: ["yoruba", "borobudur"],
  },
  {
    slug: "yoruba",
    category: "Nigeria • Language",
    title: "Yoruba",
    heroImage: "/images/cultures/yoruba.jpg",
    photoCredit: "Photo · BudayaKita Global collection",
    photoCreditUrl: "",
    intro:
      "Bahasa yang membedakan makna dengan nada. Yoruba membawa sastra lisan, proverb, dan sejarah.",
    body: [
      "Yoruba adalah bahasa di Nigeria dengan penutur lebih dari 40 juta. Bahasa ini berbasis tonal: pitch mengubah makna kata.",
      "Sastra lisan kaya: proverb, puisi, dan cerita tradisional. Proverb membawa moral dan sejarah.",
      "Yoruba juga diajarkan di sekolah dan digunakan dalam media, seni, dan kehidupan sehari-hari.",
    ],
    altText:
      "A group of people in teal striped traditional Yoruba attire with matching fila caps and coral bead necklaces gathered at an outdoor celebration.",
    transcript:
      "Narasi: Bahasa Yoruba memakai intonasi untuk makna. Proverb dan puisi disampaikan lisan. Penutur bertemu dalam upacara budaya.",
    audioUrl: "",
    relatedSlugs: ["adire-textile", "borobudur"],
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

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Audio narration
                </p>
                <AudioPlayer
                  text={culture.transcript}
                  lang="en-US"
                  rate={0.9}
                />
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
                    {culture.photoCreditUrl ? (
                      <a
                        href={culture.photoCreditUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-stone-300 underline-offset-4 transition-colors duration-500 ease-out hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {culture.photoCredit}
                      </a>
                    ) : (
                      culture.photoCredit
                    )}
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
