import type { ReactElement } from "react";
import { FiActivity, FiCamera, FiCpu, FiFlag, FiMusic, FiUsers } from "react-icons/fi";
import InfoPage from "../shared/InfoPage";

export default function ExtracurricularsPage(): ReactElement {
  return (
    <InfoPage
      group="Kesiswaan"
      title="Ekstrakurikuler"
      desc="Wadah pengembangan bakat dan minat siswa di luar jam pelajaran."
      heading="Kembangkan Potensi di Luar Kelas"
      intro="Beragam kegiatan membantu siswa membangun karakter, kepemimpinan, dan kerja sama tim."
      items={[
        { icon: FiUsers, title: "Pramuka", desc: "Melatih kemandirian, disiplin, dan jiwa kepemimpinan." },
        { icon: FiFlag, title: "Paskibra", desc: "Membentuk kedisiplinan dan rasa cinta tanah air." },
        { icon: FiCpu, title: "Coding Club", desc: "Komunitas belajar pemrograman dan teknologi." },
        { icon: FiCamera, title: "Multimedia Club", desc: "Produksi konten foto, video, dan desain kreatif." },
        { icon: FiActivity, title: "Olahraga", desc: "Kegiatan kebugaran dan latihan berbagai cabang olahraga." },
        { icon: FiMusic, title: "Seni dan Musik", desc: "Ruang berekspresi lewat musik, tari, dan seni budaya." },
      ]}
    />
  );
}
