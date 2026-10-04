import React, { useState } from "react";
import { X, UploadCloud, FileText, CheckCircle } from "lucide-react";

interface ModalUploadBerkasProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalUploadBerkas({ isOpen, onClose }: ModalUploadBerkasProps) {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    kk: null,
    ijazah: null,
    pasfoto: null,
  });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [key]: e.target.files[0] });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Unggah Berkas Persyaratan</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="p-6 space-y-4">
          <div className="space-y-4">
            {[
              { id: "kk", label: "Kartu Keluarga (PDF / JPG / PNG)" },
              { id: "ijazah", label: "Ijazah SMP / SKL (PDF / JPG / PNG)" },
              { id: "pasfoto", label: "Pasfoto 3x4 Background Merah/Biru (JPG / PNG)" },
            ].map((item) => (
              <div key={item.id} className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">{item.label}</label>
                <div className="relative border-2 border-dashed border-gray-200 hover:border-[#204382] rounded-xl p-3 flex items-center justify-between bg-slate-50/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, item.id)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-[#204382] rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-gray-600 truncate max-w-[250px]">
                      {files[item.id] ? files[item.id]?.name : "Pilih file atau drag ke sini"}
                    </span>
                  </div>
                  {files[item.id] ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <UploadCloud className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
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
              className="px-4 py-2 text-xs font-semibold text-white bg-[#204382] hover:bg-[#183363] rounded-lg transition-colors shadow-sm"
            >
              Unggah Semua
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}