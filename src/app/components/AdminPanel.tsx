import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Trash2, RefreshCw } from 'lucide-react';
import { getAllSubmissions, downloadCSV, clearAllSubmissions, type Submission } from '../storage';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AdminPanel({ open, onClose }: Props) {
  const [rows, setRows] = useState<Submission[]>([]);

  const refresh = () => setRows(getAllSubmissions());

  useEffect(() => {
    if (open) refresh();
  }, [open]);

  const handleClear = () => {
    if (confirm('Hapus semua data tersimpan di perangkat ini? Tindakan ini tidak bisa dibatalkan.')) {
      clearAllSubmissions();
      refresh();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(10,20,40,0.55)',
            zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            style={{
              width: '100%', maxWidth: 430, maxHeight: '85vh',
              background: '#F4F8FC', borderTopLeftRadius: 24, borderTopRightRadius: 24,
              padding: '18px 16px 24px', overflowY: 'auto',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 16, color: '#0A3A82' }}>
                  📊 Data Tersimpan
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                  {rows.length} pengisian tersimpan di perangkat ini
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 34, height: 34, borderRadius: '50%', border: 'none',
                  background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <X size={16} color="#1A1A2E" />
              </button>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <ActionBtn icon={<RefreshCw size={13} />} label="Refresh" onClick={refresh} />
              <ActionBtn icon={<Download size={13} />} label="Ekspor CSV" onClick={downloadCSV} disabled={rows.length === 0} accent />
              <ActionBtn icon={<Trash2 size={13} />} label="Hapus Semua" onClick={handleClear} disabled={rows.length === 0} danger />
            </div>

            {/* Info box */}
            <div style={{
              background: '#E6F2FC', border: '1px solid #CFE6FA', borderRadius: 12,
              padding: '10px 12px', fontSize: 11, color: '#0A3A82', lineHeight: 1.55,
            }}>
              Data ini tersimpan di <b>localStorage browser perangkat ini saja</b> (belum terpusat dari semua
              pengguna). Untuk mengumpulkan data dari semua orang yang mengisi ke satu database terpusat,
              hubungkan fungsi <code>saveSubmission()</code> di <code>src/app/storage.ts</code> ke layanan
              backend seperti Supabase, Firebase, atau Google Sheets API.
            </div>

            {/* Table / list */}
            {rows.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 12.5, padding: '24px 0' }}>
                Belum ada data. Coba selesaikan satu tes cek risiko dulu.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {rows.map(r => (
                  <div key={r.id} style={{
                    background: 'white', borderRadius: 14, padding: '12px 14px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>
                          {r.name || 'Anonim'} <span style={{ color: '#94A3B8', fontWeight: 500 }}>· {r.age || '-'} th</span>
                        </div>
                        <div style={{ fontSize: 10.5, color: '#64748B', marginTop: 2 }}>
                          {r.segment === 'A' ? 'Ibu Rumah Tangga' : 'Woman Youth'} · {new Date(r.timestamp).toLocaleString('id-ID')}
                        </div>
                      </div>
                      <span style={{
                        fontSize: 10.5, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                        background: r.level === 'SIAGA' ? '#DCFCE7' : r.level === 'WASPADA' ? '#FEF3C7' : '#FEE2E2',
                        color: r.level === 'SIAGA' ? '#10B981' : r.level === 'WASPADA' ? '#F59E0B' : '#EF4444',
                      }}>
                        {r.level}
                      </span>
                    </div>
                    <div style={{ fontSize: 10.5, color: '#64748B', marginTop: 6 }}>
                      Skor {r.score}/8 · Estimasi dampak Rp{r.exposure.toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ActionBtn({
  icon, label, onClick, disabled, accent, danger,
}: {
  icon: ReactNode; label: string; onClick: () => void; disabled?: boolean; accent?: boolean; danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        padding: '9px 8px', borderRadius: 10, border: 'none', cursor: disabled ? 'default' : 'pointer',
        background: danger ? '#FEE2E2' : accent ? '#0050A0' : 'white',
        color: danger ? '#EF4444' : accent ? 'white' : '#1A1A2E',
        fontSize: 11, fontWeight: 600, opacity: disabled ? 0.45 : 1,
        boxShadow: accent ? '0 3px 10px rgba(0,80,160,0.25)' : '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {icon}
      {label}
    </button>
  );
}
