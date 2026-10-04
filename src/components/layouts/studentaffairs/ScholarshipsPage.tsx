import type { ReactElement } from "react";
import { FiAward, FiBriefcase, FiFileText, FiGift } from "react-icons/fi";
import InfoPage from "../shared/InfoPage";

export default function ScholarshipsPage(): ReactElement {
  return (
    <InfoPage
      group="Kesiswaan"
      title="Beasiswa"
      desc="Informasi bantuan pendidikan, KJP, dan PIP."
      heading="Dukungan agar Setiap Siswa Bisa Belajar"
      intro="Sekolah membantu siswa berprestasi dan berhak menerima bantuan melalui berbagai program."
      items={[
        { icon: FiGift, title: "Program Indonesia Pintar", desc: "Bantuan tunai pendidikan bagi siswa yang memenuhi kriteria." },
        { icon: FiAward, title: "Beasiswa Prestasi", desc: "Apresiasi bagi siswa dengan capaian akademik dan non-akademik unggul." },
        { icon: FiBriefcase, title: "Beasiswa Mitra Industri", desc: "Dukungan dari mitra dunia usaha dan industri." },
        { icon: FiFileText, title: "Persyaratan dan Pengajuan", desc: "Isi dengan syarat dokumen dan jadwal pengajuan resmi sekolah." },
      ]}
    />
  );
}
