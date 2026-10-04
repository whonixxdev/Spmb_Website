import type { ReactElement } from "react";
import { FiBookOpen, FiCamera, FiMonitor, FiServer, FiShoppingBag, FiWifi } from "react-icons/fi";
import InfoPage from "../shared/InfoPage";

export default function FacilitiesPage(): ReactElement {
  return (
    <InfoPage
      group="Profil"
      title="Fasilitas dan Sarpras"
      desc="Sarana penunjang kegiatan belajar mengajar yang modern dan memadai."
      heading="Ruang Belajar yang Mendukung Kompetensi"
      intro="Fasilitas dirancang agar siswa terbiasa dengan lingkungan kerja industri teknologi."
      items={[
        { icon: FiMonitor, title: "Laboratorium Komputer", desc: "Perangkat praktik pemrograman dan pengembangan perangkat lunak." },
        { icon: FiCamera, title: "Studio Multimedia", desc: "Ruang produksi desain, fotografi, dan videografi." },
        { icon: FiServer, title: "Laboratorium Jaringan", desc: "Praktik instalasi, konfigurasi, dan keamanan jaringan." },
        { icon: FiShoppingBag, title: "Ruang Praktik Bisnis", desc: "Simulasi pemasaran digital dan e-commerce." },
        { icon: FiBookOpen, title: "Perpustakaan", desc: "Koleksi referensi dan ruang baca yang nyaman." },
        { icon: FiWifi, title: "Akses Internet", desc: "Jaringan internet untuk menunjang pembelajaran digital." },
      ]}
    />
  );
}
