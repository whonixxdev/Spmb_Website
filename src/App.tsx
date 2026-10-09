import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import NavbarSekolah from "./components/ui/Navbar/NavbarSekolah";
import HeroSection from "./components/layouts/home/HeroSection";
import LoginForm from "./auth/login/LoginForm";
import RegisterForm from "./auth/login/RegisterForm";
import PanitiaRegister from "./auth/login/PanitiaRegister.tsx";
import OtpForm from "./auth/otp/otpForm";
import { PanitiaRoute } from "./auth/guards/PanitiaGuard";
import NavbarDashboard from "./components/ui/Asidebar/NavbarDashboard";
import BerandaSiswa from "./components/layouts/dashboard/beranda/BerandaSiswa";
import FormulirPendaftaran from "./components/layouts/dashboard/formulir/FormulirPendaftaran";
import ForgetPasswordForm from "./auth/login/ForgetPasswordForm";
import BerandaAdmin from './components/layouts/dashboard/beranda/BerandaAdmin.tsx'

const BerkasSiswa = () => <div className="p-6 font-semibold text-lg">Halaman Berkas Persyaratan</div>;
const PembayaranSiswa = () => <div className="p-6 font-semibold text-lg">Halaman Pembayaran</div>;
const PengumumanSiswa = () => <div className="p-6 font-semibold text-lg">Halaman Status & Pengumuman Seleksi</div>;
const ProfileSiswa = () => <div className="p-6 font-semibold text-lg">Halaman Edit Pengaturan Profil Siswa</div>;

const KelolaPendaftaran = () => <div className="p-6 font-semibold text-lg">Halaman Kelola Pendaftaran</div>;
const KelolaPembayaran = () => <div className="p-6 font-semibold text-lg">Halaman Kelola Pembayaran</div>;
const KelolaJurusan = () => <div className="p-6 font-semibold text-lg">Halaman Kelola Jurusan</div>;
const LaporanAdmin = () => <div className="p-6 font-semibold text-lg">Halaman Laporan Data Siswa</div>;
const PublikasiAdmin = () => <div className="p-6 font-semibold text-lg">Halaman Publikasi Hasil Seleksi</div>;
const ProfileAdmin = () => <div className="p-6 font-semibold text-lg">Halaman Edit Pengaturan Profil Admin</div>;

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
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/otp" element={<OtpForm />} />
        <Route path="/forgot-password" element={<ForgetPasswordForm />} />

        <Route path="/register/panitia" element={<PanitiaRegister />} />

        <Route path="/siswa/dashboard" element={<DashboardLayout userRole="siswa" />}>
          <Route index element={<BerandaSiswa />} />
          <Route path="formulir" element={<FormulirPendaftaran />} />
          <Route path="berkas" element={<BerkasSiswa />} />
          <Route path="pembayaran" element={<PembayaranSiswa />} />
          <Route path="pengumuman" element={<PengumumanSiswa />} />
          <Route path="profile" element={<ProfileSiswa />} />
        </Route>

        <Route path="/dashboard/*" element={<Navigate to="/siswa/dashboard" replace />} />

        <Route element={<PanitiaRoute />}>
          <Route path="/portal-panitia-spmb" element={<DashboardLayout userRole="admin" />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<BerandaAdmin />} />
            <Route path="pendaftaran" element={<KelolaPendaftaran />} />
            <Route path="pembayaran" element={<KelolaPembayaran />} />
            <Route path="jurusan" element={<KelolaJurusan />} />
            <Route path="laporan" element={<LaporanAdmin />} />
            <Route path="publikasi" element={<PublikasiAdmin />} />
            <Route path="profile" element={<ProfileAdmin />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}