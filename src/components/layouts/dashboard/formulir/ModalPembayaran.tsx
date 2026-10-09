import React, { useState } from "react";
import { X, CreditCard, Copy, Check } from "lucide-react";
import { api } from "../../../../services/api";

interface ModalPembayaranProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ModalPembayaran({ isOpen, onClose, onSuccess }: ModalPembayaranProps) {
  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText("8830821928391283");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (proofFile) {
        const formData = new FormData();
        formData.append("bukti_pembayaran", proofFile);
        await api.post("/pembayaran/konfirmasi", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Gagal mengirim pembayaran:", err);
      if (onSuccess) onSuccess();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Pembayaran Registrasi</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 text-center space-y-1">
            <span className="text-xs text-gray-500 font-medium">Total Biaya Pendaftaran</span>
            <p className="text-2xl font-extrabold text-[#204382]">Rp 250.000</p>
          </div>

          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-[#204382] rounded-lg">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Bank Mandiri (Virtual Account)</p>
                  <p className="text-xs text-gray-500 font-mono">8830821928391283</p>
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 hover:text-[#204382] hover:bg-gray-100 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-semibold text-gray-700">Upload Bukti Transfer</label>
            <input
              type="file"
              onChange={(e) => e.target.files?.[0] && setProofFile(e.target.files[0])}
              className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#204382] hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#204382] hover:bg-[#183363] rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              {submitting ? "Memproses..." : "Konfirmasi Pembayaran"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}