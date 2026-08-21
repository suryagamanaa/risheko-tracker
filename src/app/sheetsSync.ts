// ── SINKRONISASI KE GOOGLE SHEETS (DATABASE TERPUSAT) ──
// localStorage (lihat storage.ts) sifatnya per-perangkat/browser — bagus
// untuk Admin Panel lokal & export CSV cepat, tapi tidak terkumpul dari
// semua pengguna. File ini mengirim ringkasan tiap submission ke Google
// Apps Script Web App yang menulis baris baru ke Google Sheets, supaya
// data SEMUA pengguna (dari device manapun) terkumpul di satu tempat.

const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbyaN1GEwurMu7d2bG4IgrRaSKq72eJdsPo5rOS0F8gsCRM5ZyPhoXpguRu7m-IfcPC5Jw/exec';

export interface SheetsPayload {
  name: string;
  age: number;
  segment: string;
  score: number;
  level: string;
  exposure: number;
  answers: Record<string, number>;
}

/**
 * Kirim satu baris data ke Google Sheets. Fire-and-forget: tidak
 * menunggu/menampilkan hasil ke user, dan tidak pernah membuat aplikasi
 * gagal/nge-block meski koneksi ke Google sedang bermasalah.
 *
 * Catatan teknis: pakai mode 'no-cors' karena Google Apps Script tidak
 * mengirim header CORS ke domain lain. Konsekuensinya kita tidak bisa baca
 * isi response (selalu "opaque"), jadi sukses/gagalnya baru bisa dipastikan
 * dengan cek langsung ke sheet-nya, bukan dari response di sini.
 */
export function syncToGoogleSheets(payload: SheetsPayload): void {
  fetch(GOOGLE_SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' }, // hindari CORS preflight request
    body: JSON.stringify(payload),
  }).catch(err => {
    console.error('[risheko/sheetsSync] Gagal kirim data ke Google Sheets:', err);
  });
}