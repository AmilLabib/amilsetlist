export type Site = {
  name: string;
  url: string;
  icon?: string; // opsional, kalau logo nggak ke-detect otomatis
};

// Ganti isi array ini dengan web-web lo. Urutan di sini = urutan tampil.
export const sites: Site[] = [
  {
    name: "Amil Trading",
    url: "https://amiltrading.vercel.app",
  },
  {
    name: "Jeketilive",
    url: "https://jeketilive.vercel.app",
  },
  {
    name: "Makarim",
    url: "https://makarim.vercel.app",
  },
];
