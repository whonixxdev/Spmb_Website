import type { ComponentType } from "react";
import { FiCode, FiServer, FiTrendingUp, FiTv } from "react-icons/fi";

export interface Major {
  readonly slug: string;
  readonly code: string;
  readonly name: string;
  readonly tagline: string;
  readonly desc: string;
  readonly icon: ComponentType<{ className?: string }>;
  readonly skills: readonly string[];
  readonly careers: readonly string[];
}

export const majors: readonly Major[] = [
  {
    slug: "Pplg",
    code: "PPLG",
    name: "Pengembangan Perangkat Lunak dan Gim",
    tagline: "Bangun aplikasi dan gim masa depan",
    desc: "Belajar membuat aplikasi web, mobile, dan gim dengan standar industri teknologi.",
    icon: FiCode,
    skills: ["Pemrograman web dan mobile", "Basis data", "Pengembangan gim", "Rekayasa perangkat lunak"],
    careers: ["Software Developer", "Web Developer", "Game Developer", "Quality Assurance"],
  },
  {
    slug: "Dkv",
    code: "DKV",
    name: "Desain Komunikasi Visual",
    tagline: "Wujudkan ide lewat visual kreatif",
    desc: "Mengasah kreativitas desain grafis, animasi, fotografi, dan produksi video.",
    icon: FiTv,
    skills: ["Desain grafis dan branding", "Animasi dan motion graphic", "Fotografi dan videografi", "Dasar UI/UX"],
    careers: ["Graphic Designer", "Videografer", "Content Creator", "UI Designer"],
  },
  {
    slug: "Tjkt",
    code: "TJKT",
    name: "Teknik Jaringan Komputer dan Telekomunikasi",
    tagline: "Kuasai infrastruktur jaringan modern",
    desc: "Merancang, membangun, dan mengamankan jaringan komputer serta telekomunikasi.",
    icon: FiServer,
    skills: ["Jaringan komputer", "Administrasi server", "Keamanan jaringan", "Infrastruktur telekomunikasi"],
    careers: ["Network Engineer", "System Administrator", "Teknisi Jaringan", "Cyber Security Staff"],
  },
  {
    slug: "Bd",
    code: "BD",
    name: "Bisnis Digital",
    tagline: "Berwirausaha di era digital",
    desc: "Mempelajari pemasaran digital, e-commerce, dan pengelolaan bisnis berbasis teknologi.",
    icon: FiTrendingUp,
    skills: ["Pemasaran digital", "E-commerce", "Administrasi bisnis", "Analisis data bisnis"],
    careers: ["Digital Marketer", "E-commerce Specialist", "Administrasi Bisnis", "Wirausahawan"],
  },
];
