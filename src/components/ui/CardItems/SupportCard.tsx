import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, Info, Calendar } from "lucide-react";

interface SupportCardProps {
  faqPath?: string;
  konsultasiPath?: string;
}

export default function SupportCard({
  faqPath = "https://api.whatsapp.com/send/?phone=6282261900070&text&type=phone_number&app_absent=0",
  konsultasiPath = "https://api.whatsapp.com/send/?phone=6282261900070&text&type=phone_number&app_absent=0",
}: SupportCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white space-y-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold">Butuh Bantuan?</h3>
          <p className="text-xs text-blue-100">Hubungi Panitia SPMB</p>
        </div>
      </div>

      <p className="text-xs text-blue-100 leading-relaxed">
        Tim administrasi kami siap membantu kendala pendaftaran Anda setiap hari kerja pukul 08:00 - 16:00 WITA.
      </p>

      <div className="space-y-2 pt-1">
        <Link
          to={faqPath}
          className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm transition flex items-center justify-center gap-2 border border-white/20"
        >
          <Info className="w-4 h-4" />
          <span>Pusat Bantuan (FAQ)</span>
        </Link>

        <Link
          to={konsultasiPath}
          className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm transition flex items-center justify-center gap-2 border border-white/20"
        >
          <Calendar className="w-4 h-4" />
          <span>Jadwal Konsultasi</span>
        </Link>
      </div>
    </div>
  );
}