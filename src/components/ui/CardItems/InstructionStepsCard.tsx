import React, { useState } from "react";
import {
  UserCheck,
  GraduationCap,
  FileUp,
  CreditCard,
  TicketCheck,
  Building2,
  X,
  Info,
  CheckCircle2,
} from "lucide-react";

interface StepItem {
  step: number;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  detailedInstructions: {
    description: string;
    requirements: string[];
    importantNote: string;
  };
}

export default function InstructionStepsCard() {
  const [selectedStep, setSelectedStep] = useState<StepItem | null>(null);

  const steps: StepItem[] = [
    {
      step: 1,
      title: "Isi Biodata & Gelombang",
      shortDesc: "Lengkapi data diri calon siswa sesuai gelombang pendaftaran.",
      icon: UserCheck,
      detailedInstructions: {
        description:
          "Calon siswa wajib mengisi formulir biodata diri lengkap (NIK, Nama Sesuai Ijazah, NISN, Tempat/Tanggal Lahir, serta data orang tua/wali). Pendaftaran dibuka dalam 3 gelombang:",
        requirements: [
          "Gelombang 1: Juni - Akhir Januari",
          "Gelombang 2: Februari - Juni",
          "Gelombang 3: Juni - Akhir Oktober (1 Bulan setelah pembukaan)",
        ],
        importantNote: "Pastikan NISN aktif dan data NIK sesuai dengan Kartu Keluarga (KK).",
      },
    },
    {
      step: 2,
      title: "Pilih Jurusan Tujuan",
      shortDesc: "Tentukan program keahlian atau jurusan yang kamu inginkan.",
      icon: GraduationCap,
      detailedInstructions: {
        description:
          "Pilihlah jurusan utama dan jurusan pilihan kedua yang sesuai dengan minat serta bakat kamu.",
        requirements: [
          "Pilihan Jurusan Utama",
          "Pilihan Jurusan Cadangan/Akomodasi",
          "Memenuhi kriteria nilai minimum pada mata pelajaran tertentu",
        ],
        importantNote:
          "Pilihan jurusan tidak dapat diubah setelah formulir dikirimkan ke sistem.",
      },
    },
    {
      step: 3,
      title: "Kirim Berkas Persyaratan",
      shortDesc: "Unggah dokumen pendukung secara online ke portal SPMB.",
      icon: FileUp,
      detailedInstructions: {
        description:
          "Unggah berkas digital (scan/foto jelas) melalui menu Berkas Persyaratan pada portal ini.",
        requirements: [
          "Scan Kartu Keluarga (KK) asli",
          "Scan Ijazah / Surat Keterangan Lulus (SKL)",
          "Pas foto formal terbaru latar belakang merah (Ukuran max 2MB)",
        ],
        importantNote: "Pastikan dokumen tidak buram dan format file berupa JPG/PNG/PDF.",
      },
    },
    {
      step: 4,
      title: "Pembayaran & Bukti",
      shortDesc: "Transfer via Bank BPD dan unggah resi pembayaran.",
      icon: CreditCard,
      detailedInstructions: {
        description:
          "Lakukan pembayaran biaya pendaftaran melalui rekening resmi bank yang ditunjuk. Kami TIDAK menerima pembayaran via E-Wallet (DANA/OVO/ShopeePay) maupun bank digital.",
        requirements: [
          "Pembayaran hanya melalui Rekening Resmi Bank BPD",
          "Simpan struk/resi transfer asli",
          "Unggah foto resi pembayaran di menu Pembayaran",
        ],
        importantNote:
          "Hati-hati penipuan! Pembayaran resmi hanya disalurkan melalui nomor rekening Bank BPD sekolah.",
      },
    },
    {
      step: 5,
      title: "Kartu & Kode Pendaftaran",
      shortDesc: "Dapatkan kartu peserta & 6 Digit Kode Akses Verifikasi.",
      icon: TicketCheck,
      detailedInstructions: {
        description:
          "Setelah pembayaran diverifikasi oleh keuangan, kamu dapat mengunduh Kartu Pendaftaran yang berisi 6 digit kode akses khusus.",
        requirements: [
          "Unduh & cetak Kartu Pendaftaran",
          "Simpan 6 Digit Kode Akses khusus",
          "Kode digunakan panitia/guru untuk cek kelengkapan data secara langsung",
        ],
        importantNote: "Jangan berikan 6 digit kode akses kamu kepada pihak yang tidak berkepentingan.",
      },
    },
    {
      step: 6,
      title: "Verifikasi Berkas Offline",
      shortDesc: "Wajib datang ke sekolah membawa berkas fisik asli.",
      icon: Building2,
      detailedInstructions: {
        description:
          "Meskipun pendaftaran online selesai, calon siswa WAJIB hadir secara fisik ke panitia SPMB di sekolah untuk pencocokan berkas asli.",
        requirements: [
          "Bawa Kartu Pendaftaran yang sudah dicetak",
          "Bawa Berkas Fisik Asli & Fotokopi (KK, Ijazah/SKL, Bukti Pembayaran)",
          "Mengenakan pakaian rapi, bersepatu, dan didampingi Orang Tua/Wali",
        ],
        importantNote:
          "Pendaftaran dinyatakan LENGKAP & VALID hanya setelah panitia selesai melakukan verifikasi fisik.",
      },
    },
  ];

  return (
    <>
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm space-y-4 sm:space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">
            Tahapan & Panduan Pendaftaran
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Klik pada salah satu card instruksi di bawah ini untuk melihat detail selengkapnya
          </p>
        </div>

        {/* Layout Grid: 2 Kolom di Mobile, 3 Kolom di Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                onClick={() => setSelectedStep(item)}
                className="group relative p-3 sm:p-4 rounded-xl border border-gray-200 bg-slate-50/60 hover:bg-white hover:border-[#204382] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#204382]/10 text-[#204382] group-hover:bg-[#204382] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 bg-[#204382] text-white rounded-full shrink-0">
                    Tahap {item.step}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-[#204382] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1 line-clamp-2 leading-tight sm:leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="pt-1 flex items-center text-[10px] sm:text-xs font-semibold text-[#204382] group-hover:underline">
                  <span>Lihat Detail</span>
                  <span className="ml-1">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* POP-UP MODAL DETAIL INSTRUKSI */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#204382] text-white flex items-center justify-center shrink-0">
                  {React.createElement(selectedStep.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#204382] uppercase tracking-wider">
                    Tahap {selectedStep.step} Dari 6
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800">
                    {selectedStep.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedStep(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Deskripsi */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {selectedStep.detailedInstructions.description}
            </p>

            {/* Persyaratan */}
            <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-gray-100">
              <h5 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#204382]" />
                Ketentuan & Persyaratan:
              </h5>
              <ul className="space-y-1.5 pl-1">
                {selectedStep.detailedInstructions.requirements.map((req, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#204382] mt-1.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Catatan Penting */}
            <div className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-amber-800">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] sm:text-xs leading-relaxed font-medium">
                <strong className="font-bold">Catatan:</strong>{" "}
                {selectedStep.detailedInstructions.importantNote}
              </p>
            </div>

            {/* Modal Footer / Close Button */}
            <div className="pt-2">
              <button
                onClick={() => setSelectedStep(null)}
                className="w-full py-2.5 bg-[#204382] hover:bg-[#183363] text-white font-semibold text-xs rounded-xl transition shadow-sm"
              >
                Mengerti & Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}