import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { api, type User } from "../../../../services/api";

interface ModalBiodataProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
  onSuccess?: () => void;
}

export default function ModalBiodata({ isOpen, onClose, user, onSuccess }: ModalBiodataProps) {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [nisn, setNisn] = useState("");
  const [nik, setNik] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState<"L" | "P">("L");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHpSiswa, setNoHpSiswa] = useState("");
  const [noHpOrtu, setNoHpOrtu] = useState("");
  const [asalSmp, setAsalSmp] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const formatDateForInput = (dateStr?: string | null) => {
    if (!dateStr) return "";
    return dateStr.split("T")[0];
  };

  useEffect(() => {
    if (user) {
      setNamaLengkap(user.biodata?.nama_lengkap || user.username || "");
      setNisn(user.biodata?.nisn || "");
      setNik(user.biodata?.nik || "");
      
      const jk = user.biodata?.jenis_kelamin;
      setJenisKelamin(jk === "P" ? "P" : "L");

      setTempatLahir(user.biodata?.tempat_lahir || "");
      setTanggalLahir(formatDateForInput(user.biodata?.tanggal_lahir));
      setAlamat(user.biodata?.alamat || "");
      setNoHpSiswa(user.biodata?.no_hp_siswa || user.biodata?.no_hp || user.no_hp || "");
      setNoHpOrtu(user.biodata?.no_hp_ortu || "");
      setAsalSmp(user.biodata?.asal_smp || "");
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      nama_lengkap: namaLengkap.trim() || null,
      nisn: nisn.trim() || null,
      nik: nik.trim() || null,
      jenis_kelamin: jenisKelamin,
      tempat_lahir: tempatLahir.trim() || null,
      tanggal_lahir: tanggalLahir || null,
      alamat: alamat.trim() || null,
      no_hp_siswa: noHpSiswa.trim() || null,
      no_hp_ortu: noHpOrtu.trim() || null,
      asal_smp: asalSmp.trim() || null,
    };

    try {
      const res = await api.put("/siswa/biodata", payload);
      if (res.data?.status === "success") {
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err: any) {
      const serverMessage = err.response?.data?.message || "Terjadi kesalahan pada server.";
      const errorLine = err.response?.data?.line ? ` (Line: ${err.response.data.line})` : "";
      console.error("Detail Error Backend:", err.response?.data);
      alert(`Gagal menyimpan biodata: ${serverMessage}${errorLine}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Formulir Biodata Siswa</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                placeholder="Sesuai Ijazah/Akta"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204382]/20 focus:border-[#204382]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">NISN</label>
              <input
                type="text"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                placeholder="Nomor Induk Siswa Nasional"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204382]/20 focus:border-[#204382]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">NIK</label>
              <input
                type="text"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="16 digit NIK"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204382]/20 focus:border-[#204382]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Jenis Kelamin</label>
              <select
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value as "L" | "P")}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204382]/20 focus:border-[#204382]"
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tempat Lahir</label>
              <input
                type="text"
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
                placeholder="Kota/Kabupaten"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204382]/20 focus:border-[#204382]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Lahir</label>
              <input
                type="date"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204382]/20 focus:border-[#204382]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor WhatsApp / HP Siswa</label>
              <input
                type="text"
                value={noHpSiswa}
                onChange={(e) => setNoHpSiswa(e.target.value)}
                placeholder="08123456789"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204382]/20 focus:border-[#204382]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor WhatsApp / HP Orang Tua</label>
              <input
                type="text"
                value={noHpOrtu}
                onChange={(e) => setNoHpOrtu(e.target.value)}
                placeholder="081987654321"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204382]/20 focus:border-[#204382]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Asal Sekolah (SMP/MTs)</label>
              <input
                type="text"
                value={asalSmp}
                onChange={(e) => setAsalSmp(e.target.value)}
                placeholder="Contoh: SMP Negeri 1 Denpasar"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204382]/20 focus:border-[#204382]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Lengkap</label>
            <textarea
              rows={3}
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#204382]/20 focus:border-[#204382]"
            ></textarea>
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
              disabled={submitting}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#204382] hover:bg-[#183363] rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              {submitting ? "Memproses..." : "Simpan Biodata"}
            </button>
          </div>
        </form>
      </div> 
    </div>
  );
}