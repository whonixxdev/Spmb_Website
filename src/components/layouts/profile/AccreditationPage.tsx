import type { ReactElement } from "react";
import { FiAward, FiCheckCircle, FiShield, FiTarget } from "react-icons/fi";
import InfoPage from "../shared/InfoPage";

export default function AccreditationPage(): ReactElement {
  return (
    <InfoPage
      group="Profil"
      title="Akreditasi"
      desc="Status kelayakan dan sertifikasi mutu SMK TI Bali Global Badung."
      heading="Komitmen pada Mutu Pendidikan"
      intro="Sekolah terus meningkatkan kualitas layanan pendidikan sesuai standar nasional."
      items={[
        { icon: FiAward, title: "Status Akreditasi", desc: "Isi dengan peringkat dan nomor sertifikat akreditasi resmi sekolah." },
        { icon: FiShield, title: "Standar Mutu", desc: "Penerapan standar proses, isi, dan penilaian pendidikan." },
        { icon: FiCheckCircle, title: "Sertifikasi Kompetensi", desc: "Uji kompetensi keahlian yang diakui dunia usaha dan industri." },
        { icon: FiTarget, title: "Evaluasi Berkala", desc: "Monitoring dan peningkatan mutu secara berkelanjutan." },
      ]}
    />
  );
}
