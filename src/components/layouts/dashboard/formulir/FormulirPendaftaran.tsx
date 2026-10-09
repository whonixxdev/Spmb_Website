import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  Info,
  UserCheck,
  FileCheck2,
  GraduationCap,
  CreditCard,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import SupportCard from "../../../ui/CardItems/SupportCard";
import maskotImg from "../../../../assets/img/Maskot.png";
import DataCalonSiswaSection from "./DataCalonSiswaSection";
import { getMyProfile, type User } from "../../../../services/api";

interface StepItem {
  id: number;
  title: string;
  desc: string;
  completed: boolean;
  active: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export default function FormulirPendaftaran() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  const fetchUserData = async () => {
    try {
      const u = await getMyProfile();
      setUserData(u);
    } catch (err) {
      console.error("Gagal memuat profil pendaftaran:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const isBiodataDone = Boolean(userData?.biodata?.nama_lengkap && userData?.biodata?.nisn);
  const isJurusanDone = Boolean(userData?.pendaftaran?.id_jurusan_pilihan1);
  const isBerkasDone = Boolean(
    userData?.berkas?.status_verifikasi && userData?.berkas?.status_verifikasi !== "belum_diunggah"
  );
  const isPembayaranDone = Boolean(
    userData?.berkas?.status_verifikasi === "terverifikasi" || isBerkasDone
  );
  const isKartuDone = Boolean(isPembayaranDone && isJurusanDone);
  const isVerifikasiDone = Boolean(
    userData?.pendaftaran?.status_kelulusan === "lulus" || userData?.pendaftaran?.status_kelulusan === "proses"
  );

  const rawSteps = [
    { id: 1, title: "Isi Biodata Utama", desc: "Data pribadi, alamat, dan kontak siswa.", completed: isBiodataDone, icon: UserCheck },
    { id: 2, title: "Pilih Jurusan", desc: "Pemilihan kompetensi keahlian dan gelombang.", completed: isJurusanDone, icon: GraduationCap },
    { id: 3, title: "Unggah Berkas Persyaratan", desc: "Upload pasfoto, KK, dan ijazah/SKL.", completed: isBerkasDone, icon: FileCheck2 },
    { id: 4, title: "Pembayaran Registrasi", desc: "Pembayaran biaya administrasi awal.", completed: isPembayaranDone, icon: CreditCard },
    { id: 5, title: "Kartu & Kode Akses", desc: "Cetak kartu peserta tes & verifikasi.", completed: isKartuDone, icon: QrCode },
    { id: 6, title: "Verifikasi Berkas", desc: "Validasi fisik dan pengumuman seleksi.", completed: isVerifikasiDone, icon: ShieldCheck },
  ];

  let foundActive = false;
  const steps: StepItem[] = rawSteps.map((s) => {
    let active = false;
    if (!s.completed && !foundActive) {
      active = true;
      foundActive = true;
    }
    return { ...s, active };
  });

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercentage = Math.round((completedCount / steps.length) * 100);
  const activeStepObj = steps.find((s) => s.active);
  const currentStepIndex = activeStepObj ? activeStepObj.id : steps.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#204382]">
          Formulir Pendaftaran SPMB
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Silakan isi data diri dan persyaratannya dengan lengkap dan benar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <DataCalonSiswaSection
            user={userData}
            onRefreshData={fetchUserData}
            currentStepIndex={currentStepIndex}
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-800">
                  Progres Pendaftaran
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {completedCount} dari {steps.length} langkah selesai
                </p>
              </div>
              <span className="text-sm font-extrabold text-[#204382]">
                {progressPercentage}%
              </span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#204382] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div className="relative pt-2">
              {steps.map((step, idx) => {
                return (
                  <div
                    key={step.id}
                    className="relative flex gap-3 pb-5 last:pb-0"
                  >
                    {idx !== steps.length - 1 && (
                      <div
                        className={`absolute left-[15px] top-7 bottom-0 w-[2px] ${
                          step.completed ? "bg-[#204382]" : "bg-gray-200"
                        }`}
                      ></div>
                    )}

                    <div className="relative z-10 shrink-0">
                      {step.completed ? (
                        <div className="w-8 h-8 rounded-full bg-[#204382] text-white flex items-center justify-center shadow-sm">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      ) : step.active ? (
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm ring-4 ring-amber-100 animate-pulse">
                          <Clock className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 text-gray-400 flex items-center justify-center">
                          <Circle className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold truncate ${
                            step.completed
                              ? "text-gray-800"
                              : step.active
                                ? "text-amber-600 font-bold"
                                : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </span>

                        <div className="relative">
                          <button
                            onMouseEnter={() => setActiveTooltip(step.id)}
                            onMouseLeave={() => setActiveTooltip(null)}
                            onClick={() =>
                              setActiveTooltip(
                                activeTooltip === step.id ? null : step.id
                              )
                            }
                            className="text-gray-400 hover:text-[#204382] p-1 rounded-full transition-colors"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>

                          {activeTooltip === step.id && (
                            <div className="absolute right-0 bottom-full mb-2 w-48 p-2.5 bg-gray-900 text-white text-[11px] rounded-lg shadow-xl z-50 pointer-events-none">
                              <p className="font-semibold">{step.title}</p>
                              <p className="text-gray-300 mt-0.5 text-[10px] leading-tight">
                                {step.desc}
                              </p>
                              <div className="mt-1 pt-1 border-t border-gray-700 flex items-center justify-between text-[9px]">
                                <span>Status:</span>
                                <span
                                  className={
                                    step.completed
                                      ? "text-emerald-400 font-medium"
                                      : step.active
                                        ? "text-amber-400 font-medium"
                                        : "text-gray-400"
                                  }
                                >
                                  {step.completed
                                    ? "Selesai"
                                    : step.active
                                      ? "Sedang Dikerjakan"
                                      : "Belum Dikerjakan"}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-400 truncate mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col items-center mt-1 sm:-mt-6">
            <div className="-mb-2 z-10 pointer-events-none">
              <img
                src={maskotImg}
                alt="Maskot SPMB"
                className="w-28 sm:w-32 lg:w-36 h-auto object-contain drop-shadow-lg"
              />
            </div>
            <div className="w-full z-20">
              <SupportCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}