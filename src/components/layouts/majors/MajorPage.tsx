import type { ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import PageShell from "../shared/PageShell";
import MajorCard from "../../ui/CardItems/MajorCard";
import Reveal from "../../ui/Motion/Reveal";
import { majors } from "./majorsData";
import PageHeader from "../home/PageHeader";
import SectionHeading from "../home/SectionHeading";

export default function MajorPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const major = majors.find((item) => item.slug.toLowerCase() === slug?.toLowerCase());

  if (!major) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-5 py-32 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Jurusan tidak ditemukan</h1>
          <Link to="/" className="mt-6 inline-block font-bold text-blue-600">
            Kembali ke Beranda
          </Link>
        </div>
      </PageShell>
    );
  }

  const Icon = major.icon;
  const others = majors.filter((item) => item.slug !== major.slug);

  return (
    <PageShell>
      <PageHeader group="Jurusan" title={major.code} desc={major.name} />

      <section className="py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-3 lg:px-8">
          <Reveal className="rounded-3xl bg-linear-to-br from-blue-950 to-blue-600 p-8 text-white">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              <Icon />
            </div>
            <h2 className="mb-3 text-2xl font-extrabold">{major.tagline}</h2>
            <p className="mb-8 text-sm leading-relaxed text-blue-100">{major.desc}</p>
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700"
            >
              Daftar Jurusan Ini
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-slate-200 p-8">
            <h3 className="mb-5 text-lg font-bold text-slate-900">Kompetensi yang Dipelajari</h3>
            <ul className="space-y-3">
              {major.skills.map((skill) => (
                <li key={skill} className="flex items-start gap-3 text-slate-700">
                  <FiCheckCircle className="mt-1 shrink-0 text-blue-600" />
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="rounded-3xl border border-slate-200 p-8">
            <h3 className="mb-5 text-lg font-bold text-slate-900">Prospek Karier</h3>
            <ul className="space-y-3">
              {major.careers.map((career) => (
                <li key={career} className="flex items-start gap-3 text-slate-700">
                  <FiCheckCircle className="mt-1 shrink-0 text-amber-500" />
                  {career}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Jurusan Lainnya" title="Jelajahi Program Keahlian Lain" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <MajorCard key={item.slug} major={item} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
