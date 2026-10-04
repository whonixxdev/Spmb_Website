import type { ReactElement } from "react";
import { FiBriefcase, FiLayers, FiUser, FiUsers } from "react-icons/fi";
import InfoPage from "../shared/InfoPage";

export default function OrganizationalPage(): ReactElement {
  return (
    <InfoPage
      group="Profil"
      title="Struktur Organisasi"
      desc="Bagan dan hirarki tata kelola SMK TI Bali Global Badung."
      heading="Tata Kelola yang Terarah"
      intro="Struktur organisasi memastikan setiap layanan pendidikan berjalan terkoordinasi dan akuntabel."
      items={[
        { icon: FiUser, title: "Kepala Sekolah", desc: "Pimpinan tertinggi yang menetapkan arah dan kebijakan sekolah." },
        { icon: FiUsers, title: "Wakil Kepala Sekolah", desc: "Mengoordinasikan bidang kurikulum, kesiswaan, sarana, dan humas." },
        { icon: FiLayers, title: "Kepala Program Keahlian", desc: "Mengelola pembelajaran dan kompetensi tiap jurusan." },
        { icon: FiBriefcase, title: "Tata Usaha", desc: "Mendukung layanan administrasi sekolah dan pendaftaran siswa." },
        { icon: FiUsers, title: "Guru dan Pembimbing", desc: "Pendidik yang mendampingi proses belajar dan pengembangan karakter siswa." },
      ]}
    />
  );
}
