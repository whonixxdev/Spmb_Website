import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { api, type Jurusan } from "../../../../services/api";

interface ModalJurusanProps {
  isOpen: boolean;
  onClose: () => void;
  currentJurusanId?: number | null;
  onSuccess?: () => void;
}

export default function ModalJurusan({
  isOpen,
  onClose,
  currentJurusanId,
  onSuccess,
}: ModalJurusanProps) {
  const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
  const [selectedJurusan, setSelectedJurusan] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchJurusan();
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentJurusanId) {
      setSelectedJurusan(Number(currentJurusanId));
    }
  }, [currentJurusanId]);

  const fetchJurusan = async () => {
    try {
      setLoading(true);
      const res = await api.get("/jurusan");
      const list: Jurusan[] = res.data.data || res.data || [];
      setJurusanList(list);

      if (!currentJurusanId && list.length > 0) {
        setSelectedJurusan(list[0].id_jurusan);
      }
    } catch (err) {
      console.error("Gagal mengambil data jurusan:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJurusan) return;

    setSubmitting(true);
    try {
      await api.post("/pendaftaran/pilih-jurusan", {
        id_jurusan_pilihan1: Number(selectedJurusan),
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Gagal menyimpan jurusan:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">
            Pilih Kompetensi Keahlian (Jurusan)
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-3">
            {loading ? (
              <p className="text-xs text-slate-400 text-center py-4">
                Memuat daftar jurusan...
              </p>
            ) : jurusanList.length > 0 ? (
              jurusanList.map((item) => (
                <label
                  key={item.id_jurusan}
                  onClick={() => setSelectedJurusan(item.id_jurusan)}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedJurusan === item.id_jurusan
                      ? "border-[#204382] bg-blue-50/50 ring-1 ring-[#204382]"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="jurusan"
                    value={item.id_jurusan}
                    checked={selectedJurusan === item.id_jurusan}
                    onChange={() => setSelectedJurusan(item.id_jurusan)}
                    className="mt-1 accent-[#204382]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-800">
                        {item.nama_jurusan}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                        {item.kode_jurusan}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Kuota: {item.kuota} Siswa
                    </p>
                  </div>
                </label>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">
                Daftar jurusan belum tersedia
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting || !selectedJurusan}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#204382] hover:bg-[#183363] rounded-lg transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {submitting ? "Memproses..." : "Simpan Pilihan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}