import React, { useState } from "react";
import {
  UserCheck,
  GraduationCap,
  FileCheck2,
  CreditCard,
  QrCode,
} from "lucide-react";
import AccordionSection from "./AccordionSection";

import ModalBiodata from "./ModalBiodata";
import ModalJurusan from "./ModalJurusan";
import ModalUploadBerkas from "./ModalUploadBerkas";
import ModalPembayaran from "./ModalPembayaran";
import ModalKartuAkses from "./ModalKartuAkses";
import { type User } from "../../../../services/api";

interface DataCalonSiswaSectionProps {
  user?: User | null;
  onRefreshData?: () => void;
  currentStepIndex?: number;
}

export default function DataCalonSiswaSection({
  user,
  onRefreshData,
  currentStepIndex = 1,
}: DataCalonSiswaSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-gray-800">
            Data Calon Siswa
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Isi data di bawah ini sesuai dokumen resmi.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-[#204382]">
          Tahap {currentStepIndex} dari 6
        </span>
      </div>

      <div className="space-y-3">
        <AccordionSection
          icon={UserCheck}
          title="Isi Biodata Utama"
          subtitle="Klik untuk melihat rincian instruksi pengisian biodata"
          description={
            <p>
              Pastikan seluruh data diri diisi dengan teliti sesuai dokumen
              resmi seperti <strong>Kartu Keluarga (KK)</strong>,{" "}
              <strong>Akta Kelahiran</strong>, dan <strong>Ijazah/SKL</strong>.
            </p>
          }
          buttonLabel="Isi Biodata"
          onButtonClick={() => setActiveModal("biodata")}
        />

        <AccordionSection
          icon={GraduationCap}
          title="Pilih Jurusan"
          subtitle="Klik untuk menentukan kompetensi keahlian pilihan Anda"
          description={
            <p>
              Pilih jurusan yang diminati. Pilihan jurusan menentukan program
              keahlian dan tes kompetensi dasar yang akan dilaksanakan.
            </p>
          }
          buttonLabel="Pilih Jurusan"
          onButtonClick={() => setActiveModal("jurusan")}
        />

        <AccordionSection
          icon={FileCheck2}
          title="Unggah Berkas Persyaratan"
          subtitle="Klik untuk mengunggah dokumen digital persyaratan"
          description={
            <p>
              Unggah scan atau foto dokumen resmi pendukung seperti Pasfoto,
              Kartu Keluarga, dan Ijazah/SKL dalam format JPG, PNG, atau PDF.
            </p>
          }
          buttonLabel="Unggah Berkas"
          onButtonClick={() => setActiveModal("berkas")}
        />

        <AccordionSection
          icon={CreditCard}
          title="Pembayaran Registrasi"
          subtitle="Klik untuk melakukan pembayaran administrasi awal"
          description={
            <p>
              Lakukan pembayaran biaya pendaftaran melalui bank/virtual account
              yang telah disediakan lalu unggah bukti transaksi.
            </p>
          }
          buttonLabel="Bayar Registrasi"
          onButtonClick={() => setActiveModal("pembayaran")}
        />

        <AccordionSection
          icon={QrCode}
          title="Kartu & Kode Akses"
          subtitle="Klik untuk mencetak kartu pendaftaran dan nomor ujian"
          description={
            <p>
              Cetak atau simpan kartu peserta tes ujian seleksi pendaftaran
              setelah pembayaran terkonfirmasi.
            </p>
          }
          buttonLabel="Lihat Kartu"
          onButtonClick={() => setActiveModal("kartu")}
        />
      </div>

      <ModalBiodata
        isOpen={activeModal === "biodata"}
        onClose={() => setActiveModal(null)}
        user={user}
        onSuccess={onRefreshData}
      />
      <ModalJurusan
        isOpen={activeModal === "jurusan"}
        onClose={() => setActiveModal(null)}
        currentJurusanId={user?.pendaftaran?.id_jurusan_pilihan1 ?? undefined} // <-- Tambahkan ?? undefined
        onSuccess={onRefreshData}
      />
      <ModalUploadBerkas
        isOpen={activeModal === "berkas"}
        onClose={() => setActiveModal(null)}
        onSuccess={onRefreshData}
      />
      <ModalPembayaran
        isOpen={activeModal === "pembayaran"}
        onClose={() => setActiveModal(null)}
        onSuccess={onRefreshData}
      />
      <ModalKartuAkses
        isOpen={activeModal === "kartu"}
        onClose={() => setActiveModal(null)}
        user={user}
      />
    </div>
  );
}
