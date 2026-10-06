import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import NavbarSekolah from "./components/ui/Navbar/NavbarSekolah";
import HeroSection from "./components/layouts/home/HeroSection";
import LoginForm from "./auth/login/LoginForm";
import RegisterForm from "./auth/login/RegisterForm";
import OtpForm from "./auth/otp/otpForm";
import { LoginPanitiaForm } from "./auth/LoginPanitiaForm";
import { PanitiaRoute } from "./auth/guards/PanitiaGuard";
import NavbarDashboard from "./components/ui/Asidebar/NavbarDashboard";
import BerandaSiswa from "./components/layouts/dashboard/beranda/BerandaSiswa";
import FormulirPendaftaran from "./components/layouts/dashboard/formulir/FormulirPendaftaran";

const BerkasSiswa = () => <div className="p-6 font-semibold text-lg">Halaman Berkas Persyaratan</div>;
const PembayaranSiswa = () => <div className="p-6 font-semibold text-lg">Halaman Pembayaran</div>;
const PengumumanSiswa = () => <div className="p-6 font-semibold text-lg">Halaman Status & Pengumuman Seleksi</div>;

const DashboardAdmin = () => <div className="p-6 font-semibold text-lg">Halaman Dashboard Admin</div>;
const KelolaPendaftaran = () => <div className="p-6 font-semibold text-lg">Halaman Kelola Pendaftaran</div>;
const KelolaPembayaran = () => <div className="p-6 font-semibold text-lg">Halaman Kelola Pembayaran</div>;
const KelolaJurusan = () => <div className="p-6 font-semibold text-lg">Halaman Kelola Jurusan</div>;
const LaporanAdmin = () => <div className="p-6 font-semibold text-lg">Halaman Laporan Data Siswa</div>;
const PublikasiAdmin = () => <div className="p-6 font-semibold text-lg">Halaman Publikasi Hasil Seleksi</div>;

function DashboardLayout({ userRole }: { userRole: "siswa" | "admin" }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarDashboard userRole={userRole} />

      <main className="pt-16 lg:pl-64 min-h-screen transition-all duration-300">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function WesiteSekolahPage() {
  return (
    <>
      <NavbarSekolah />
      <main className="w-full">
        <HeroSection />
      </main>
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-white font-cabinet text-gray-900">
      <Routes>
        <Route path="/" element={<WesiteSekolahPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/panitia" element={<LoginPanitiaForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/otp" element={<OtpForm />} />

        <Route path="/siswa/dashboard" element={<DashboardLayout userRole="siswa" />}>
          <Route index element={<BerandaSiswa />} />
          <Route path="formulir" element={<FormulirPendaftaran />} />
          <Route path="berkas" element={<BerkasSiswa />} />
          <Route path="pembayaran" element={<PembayaranSiswa />} />
          <Route path="pengumuman" element={<PengumumanSiswa />} />
        </Route>

        <Route path="/dashboard/*" element={<Navigate to="/siswa/dashboard" replace />} />

        <Route element={<PanitiaRoute />}>
          <Route path="/admin" element={<DashboardLayout userRole="admin" />}>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="pendaftaran" element={<KelolaPendaftaran />} />
            <Route path="pembayaran" element={<KelolaPembayaran />} />
            <Route path="jurusan" element={<KelolaJurusan />} />
            <Route path="laporan" element={<LaporanAdmin />} />
            <Route path="publikasi" element={<PublikasiAdmin />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}