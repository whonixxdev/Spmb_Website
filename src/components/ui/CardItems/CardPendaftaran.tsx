import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const SPMB_HREF = "/spmb";

export default function RegistrationCard(): ReactElement {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-3xl bg-blue-600 text-white shadow-2xl">
        {/* Layout Grid Split 2 Kolom untuk Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[320px]">
          
          {/* Sisi Kiri: Informasi Utama & Statistik */}
          <div className="lg:col-span-8 p-8 md:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight">
                Sudah Siap Menjadi Generasi Digital Berikutnya?
              </h2>
              <p className="text-blue-100 text-sm md:text-base max-w-2xl leading-relaxed">
                Jangan lewatkan kesempatan untuk belajar di lingkungan yang
                inspiratif dengan teknologi terbaik. Kuota terbatas untuk setiap
                gelombang pendaftaran.
              </p>
            </div>

            {/* Bagian Statistik */}
            <div className="pt-4 border-t border-blue-500/40 grid grid-cols-3 gap-4 md:flex md:items-center md:gap-8">
              {/* Tahun Pengalaman */}
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  10+
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-blue-200 tracking-wider uppercase">
                  TAHUN PENGALAMAN
                </div>
              </div>

              {/* Garis Pembatas Vertikal */}
              <div className="hidden md:block h-10 w-[1px] bg-blue-400/40" />

              {/* Lulusan Sukses */}
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  2000+
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-blue-200 tracking-wider uppercase">
                  LULUSAN SUKSES
                </div>
              </div>

              {/* Garis Pembatas Vertikal */}
              <div className="hidden md:block h-10 w-[1px] bg-blue-400/40" />

              {/* Mitra Industri / Kontribusi */}
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  61+
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-blue-200 tracking-wider uppercase">
                  MITRA INDUSTRI
                </div>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Call to Action (CTA) */}
          <div className="lg:col-span-4 bg-blue-700/50 backdrop-blur-sm p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-4 border-t lg:border-t-0 lg:border-l border-blue-500/30">
            <Link
              to={SPMB_HREF}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300"
            >
              <span>Daftar Sekarang</span>
              <FiArrowRight className="text-lg" />
            </Link>

            <p className="text-xs text-blue-200 max-w-xs leading-relaxed">
              Informasi lebih lanjut? Hubungi WhatsApp kami.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}