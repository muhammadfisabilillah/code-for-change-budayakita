# Static images

Letakkan semua gambar di sini. Next.js menyajikan isi folder `public/` dari root URL (`/`).

## Struktur

| Folder | Isi | Contoh nama file |
| --- | --- | --- |
| `hero/` | Foto utama halaman home | `atlas-cover.jpg` |
| `countries/` | Bendera / foto negara (opsional, saat ini memakai flagcdn) | `id.png`, `jp.png`, `br.png` |
| `cultures/` | Foto item budaya (makanan, tari, seni, bahasa) | `tari-saman.jpg`, `rendang.jpg`, `ikebana.jpg` |

## Cara pakai di kode

```tsx
<Image src="/images/cultures/rendang.jpg" alt="..." fill />
```

Di database / seed, isi `media_url` dengan path yang sama:

```ts
media_url: "/images/cultures/rendang.jpg"
```

## Catatan aksesibilitas

Setiap gambar tetap butuh `alt_text` yang mendeskripsikan **isi gambar asli**.
Kolom `alt_text` di tabel `accessibility_meta` dipakai UI sebagai `alt` pada
`<Image>`. Jika kamu mengganti gambar placeholder `picsum.photos`, perbarui
`alt_text`-nya juga di `lib/seed.ts` (fallback) dan/atau `scripts/seed.ts`
(seeder database).

Format yang disarankan: `.jpg` untuk foto, `.png` untuk bendera/grafis, `.webp` untuk kompresi lebih ringan.
