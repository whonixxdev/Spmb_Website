import React, { useState } from "react";
import { ChevronDown, FileText, Edit3 } from "lucide-react";

interface AccordionBiodataProps {
  onOpenModal: () => void;
}

export default function AccordionBiodata({ onOpenModal }: AccordionBiodataProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-100/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-[#204382] rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Isi Biodata Utama</h3>
            <p className="text-xs text-gray-500">Klik untuk melihat rincian instruksi pengisian biodata</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-100 space-y-4 bg-white animate-in slide-in-from-top-2 duration-200">
          <div className="text-xs text-gray-600 space-y-2 leading-relaxed">
            <p>
              Pastikan seluruh data diri diisi dengan teliti sesuai dokumen resmi seperti <strong>Kartu Keluarga (KK)</strong>, <strong>Akta Kelahiran</strong>, dan <strong>Ijazah/SKL</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-500 pl-1">
              <li>Nama lengkap harus sesuai dengan Akta Kelahiran.</li>
              <li>NISN terdiri dari 10 digit angka valid.</li>
              <li>Alamat diisi sesuai domisili tempat tinggal saat ini.</li>
            </ul>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onOpenModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#204382] hover:bg-[#183363] rounded-lg transition-colors shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Isi Biodata
            </button>
          </div>
        </div>
      )}
    </div>
  );
}