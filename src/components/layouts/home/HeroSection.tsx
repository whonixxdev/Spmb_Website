import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import FooterSekolah from "./footerSection";
import RegistrationCard from "../../ui/CardItems/CardPendaftaran";
import PageSection from "./PageSection";

export default function HeroSection(): ReactElement {
  const { user } = useAuth();

  return (
    <>
    
    <section className="bg-white py-16 md:py-30 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-left space-y-6">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs md:text-sm font-semibold border border-blue-200">
            Pendaftaran SPMB 2027/2028
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Belajar. Berkarya. Berinovasi. <br />
            <span className="text-blue-600">SMK TI Bali Global Badung</span>
          </h1>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
            Smk TI Bali Global Badung menghadirkan pendidikan vokasi berbasis teknologi untuk membekali siswa dengan kompetensi, kreativitas, dan pengalaman yang relevan dengan dunia industri.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {user ? (
              <Link
                to="/dashboard"
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition duration-200 text-center"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition duration-200 text-center"
              >
                Daftar Sekarang
              </Link>
            )}

            <a
              href="/jurusan"
              className="px-8 py-3.5 bg-transparent hover:bg-gray-50 text-gray-700 font-semibold rounded-full border border-gray-300 transition duration-200 text-center"
            >
              Lihat Jurusan
            </a>
          </div>
        </div>
      </div>
    </section>

    <RegistrationCard/>
    <FooterSekolah/>
    </>
  );
}