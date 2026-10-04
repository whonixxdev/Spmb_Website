import type { ReactElement } from "react";
import { FiAward, FiMusic, FiStar, FiTrendingUp } from "react-icons/fi";
import InfoPage from "../shared/InfoPage";

export default function AchievementsPage(): ReactElement {
  return (
    <InfoPage
      group="Kesiswaan"
      title="Prestasi Siswa"
      desc="Pencapaian siswa di bidang akademik dan non-akademik."
      heading="Bukti Nyata Kerja Keras Siswa"
      intro="Daftar prestasi diperbarui secara berkala dari berbagai kompetisi dan kegiatan."
      items={[
        { icon: FiAward, title: "Prestasi Akademik", desc: "Capaian olimpiade, lomba karya ilmiah, dan kompetensi keahlian." },
        { icon: FiStar, title: "Lomba Kompetensi Siswa", desc: "Prestasi pada ajang LKS tingkat kabupaten hingga nasional." },
        { icon: FiMusic, title: "Seni dan Kreativitas", desc: "Karya siswa di bidang desain, musik, dan seni budaya." },
        { icon: FiTrendingUp, title: "Olahraga", desc: "Prestasi pada berbagai cabang olahraga dan kejuaraan pelajar." },
      ]}
    />
  );
}
