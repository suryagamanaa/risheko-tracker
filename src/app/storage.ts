// ── LAPISAN DATA (DATABASE LOKAL + SINKRONISASI TERPUSAT) ──
// Aplikasi ini adalah SPA statis (React + Vite) tanpa server sendiri, jadi
// "database"-nya memakai localStorage di browser pengguna: setiap kali
// seseorang menyelesaikan tes, hasilnya otomatis tersimpan permanen di
// perangkat itu (tidak hilang saat refresh/tutup tab), dan bisa ditarik/
// diekspor kapan saja lewat Admin Panel di halaman utama.
//
// SEKALIGUS, tiap submission juga dikirim ke Google Sheets (lihat
// sheetsSync.ts) supaya data dari SEMUA pengguna/perangkat terkumpul di
// satu tempat terpusat — bukan cuma tersimpan lokal di device masing-masing.
//
// CATATAN: localStorage tetap dipertahankan sebagai cadangan/cache lokal
// (misal untuk Admin Panel & export CSV cepat tanpa perlu buka Google
// Sheets), sementara Google Sheets jadi sumber data gabungan semua user.

import type { Segment } from './App';
import { syncToGoogleSheets } from './sheetsSync';

export interface Submission {
  id: string;
  timestamp: string; // ISO string
  name: string;
  age: number;
  segment: Segment;
  answers: Record<string, number>;
  score: number;
  level: string;
  exposure: number;
}

const STORAGE_KEY = 'risheko_submissions_v1';

function readAll(): Submission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('[risheko/storage] Gagal membaca data:', e);
    return [];
  }
}

function writeAll(rows: Submission[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch (e) {
    console.error('[risheko/storage] Gagal menyimpan data:', e);
  }
}

/**
 * Simpan satu hasil tes baru. Dipanggil otomatis begitu user selesai
 * menjawab. Menyimpan ke localStorage (device ini) DAN mengirim ke Google
 * Sheets (terpusat, semua device) sekaligus.
 */
export function saveSubmission(data: Omit<Submission, 'id' | 'timestamp'>): Submission {
  const record: Submission = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
  };
  const all = readAll();
  all.push(record);
  writeAll(all);

  // Kirim ringkasan ke Google Sheets — supaya data seluruh pengguna
  // (dari device manapun) terkumpul di satu spreadsheet yang sama.
syncToGoogleSheets({
  name: record.name,
  age: record.age,
  segment: record.segment,
  score: record.score,
  level: record.level,
  exposure: record.exposure,
  answers: record.answers,
});

  return record;
}

/** Ambil semua data yang pernah tersimpan, terbaru duluan. */
export function getAllSubmissions(): Submission[] {
  return readAll().sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function getSubmissionCount(): number {
  return readAll().length;
}

/** Hapus semua data (reset database lokal). */
export function clearAllSubmissions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/** Ubah semua data jadi teks CSV, siap diunduh/dibuka di Excel/Sheets. */
export function toCSV(rows: Submission[]): string {
  if (rows.length === 0) return '';
  const headers = ['id', 'waktu', 'nama', 'usia', 'segmen', 'skor', 'level', 'estimasi_dampak', 'jawaban_detail'];
  const escape = (v: unknown) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = rows.map(r =>
    [r.id, r.timestamp, r.name, r.age, r.segment, r.score, r.level, r.exposure, JSON.stringify(r.answers)]
      .map(escape)
      .join(',')
  );
  return [headers.map(escape).join(','), ...lines].join('\n');
}

/** Trigger unduh file CSV berisi seluruh data yang tersimpan di perangkat ini. */
export function downloadCSV(): void {
  const rows = getAllSubmissions();
  const csv = toCSV(rows);
  if (!csv) return;
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `risheko-data-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}