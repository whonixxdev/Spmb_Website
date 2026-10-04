import React, { useState } from "react";
import { X, Check } from "lucide-react";

interface ModalJurusanProps {
  isOpen: boolean;
  onClose: () => void;
}

const listJurusan = [
  { id: "RPL", name: "Rekayasa Perangkat Lunak", desc: "Pemrograman Web, Mobile App, dan Software Development" },
  { id: "TKJ", name: "Teknik Komputer & Jaringan", desc: "Infrastruktur Jaringan, Server, Cloud Computing, & Security" },
  { id: "MM", name: "Desain Komunikasi Visual / Multimediia", desc: "Graphic Design, Video Editing, 3D Animation, & UI/UX" },
];

export default function ModalJurusan({ isOpen, onClose }: ModalJurusanProps) {
  const [selectedJurusan, setSelectedJurusan] = useState<string>("RPL");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Pilih Kompetensi Keahlian (Jurusan)</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="p-6 space-y-4">
          <div className="space-y-3">
            {listJurusan.map((item) => (
              <label
                key={item.id}
                onClick={() => setSelectedJurusan(item.id)}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedJurusan === item.id
                    ? "border-[#204382] bg-blue-50/50 ring-1 ring-[#204382]"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="jurusan"
                  value={item.id}
                  checked={selectedJurusan === item.id}
                  onChange={() => setSelectedJurusan(item.id)}
                  className="mt-1 accent-[#204382]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-800">{item.name}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {item.id}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#204382] hover:bg-[#183363] rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Simpan Pilihan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}