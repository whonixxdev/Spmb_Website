import React from "react";
import { X, QrCode, Printer, Download } from "lucide-react";
import { type User } from "../../../../services/api";

interface ModalKartuAksesProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
}

export default function ModalKartuAkses({ isOpen, onClose, user }: ModalKartuAksesProps) {
  if (!isOpen) return null;

  const noPendaftaran = user?.pendaftaran?.id_pendaftaran 
    ? `REG-${String(user.pendaftaran.id_pendaftaran).padStart(5, '0')}`
    : `REG-${user?.id_user || '001'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Kartu Peserta Tes</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="border-2 border-gray-200 rounded-2xl p-5 bg-gradient-to-br from-slate-50 to-blue-50/30 text-center space-y-3">
            <div className="w-16 h-16 bg-[#204382] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <QrCode className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Kode Akses Ujian</p>
              <p className="text-xl font-extrabold text-[#204382] tracking-widest mt-0.5">
                SPMB-2026-{user?.id_user || '8892'}
              </p>
            </div>
            <div className="pt-2 text-xs text-gray-600 border-t border-gray-200/60 grid grid-cols-2 gap-2 text-left">
              <div>
                <span className="text-gray-400 block text-[10px]">No. Pendaftaran</span>
                <span className="font-semibold">{noPendaftaran}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Nama Siswa</span>
                <span className="font-semibold truncate block">
                  {user?.biodata?.nama_lengkap || user?.username || 'Siswa'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => alert("Mengunduh Kartu Ujian PDF...")}
              className="flex-1 py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-semibold text-[#204382] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#204382] hover:bg-[#183363] rounded-lg transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Cetak Kartu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}