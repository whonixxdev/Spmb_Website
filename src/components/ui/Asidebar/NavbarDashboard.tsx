import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  FolderCheck,
  CreditCard,
  Megaphone,
  LogOut,
  Bell,
  Menu,
} from "lucide-react";

import logoSmk from "../../../assets/img/logo-smk.png";

export interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavbarDashboardProps {
  userRole?: "siswa" | "admin";
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

const SISWA_NAV_ITEMS: NavItem[] = [
  {
    id: "beranda",
    title: "Beranda",
    path: "/siswa/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "formulir",
    title: "Formulir Pendaftaran",
    path: "/siswa/dashboard/formulir",
    icon: FileText,
  },
  {
    id: "berkas",
    title: "Berkas Persyaratan",
    path: "/siswa/dashboard/berkas",
    icon: FolderCheck,
  },
  {
    id: "pembayaran",
    title: "Pembayaran",
    path: "/siswa/dashboard/pembayaran",
    icon: CreditCard,
  },
  {
    id: "pengumuman",
    title: "Status & Pengumuman Seleksi",
    path: "/siswa/dashboard/pengumuman",
    icon: Megaphone,
  },
];

const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    id: "admin-dashboard",
    title: "Dashboard Admin",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "kelola-pendaftaran",
    title: "Kelola Pendaftaran",
    path: "/admin/pendaftaran",
    icon: FileText,
  },
  {
    id: "kelola-pembayaran",
    title: "Kelola Pembayaran",
    path: "/admin/pembayaran",
    icon: CreditCard,
  },
  {
    id: "kelola-jurusan",
    title: "Kelola Jurusan & Kuota",
    path: "/admin/jurusan",
    icon: FolderCheck,
  },
  {
    id: "laporan",
    title: "Laporan Data Siswa",
    path: "/admin/laporan",
    icon: FileText,
  },
  {
    id: "publikasi",
    title: "Publikasi Hasil Seleksi",
    path: "/admin/publikasi",
    icon: Megaphone,
  },
];

export default function NavbarDashboard({
  userRole = "admin",
  userName = "Ahmad Rizky",
  userEmail = "ahmad.rizky@gmail.com",
  onLogout,
}: NavbarDashboardProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navList = userRole === "admin" ? ADMIN_NAV_ITEMS : SISWA_NAV_ITEMS;

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "S";
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200/80 px-4 lg:px-6 flex items-center justify-between z-40 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#204382] hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to={userRole === "admin" ? "/admin/dashboard" : "/siswa/dashboard"} className="flex items-center gap-3">
            <img
              src={logoSmk}
              alt="Logo SMK TI"
              className="h-9 w-9 object-contain"
            />
            <span className="font-cabinet font-bold text-xl tracking-wide text-[#204382]">
              SMKTI SPMB
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:gap-4">
          <button
            className="relative p-2 text-gray-500 hover:text-[#204382] hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
            title="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#204382] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {getInitial(userName)}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-gray-800 leading-tight">
                {userName}
              </span>
              <span className="text-[11px] text-gray-400 leading-tight">
                {userEmail}
              </span>
            </div>
          </div>
        </div>
      </header>

      <aside className="hidden lg:flex fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200/80 flex-col z-30 select-none">
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navList.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-[#204382] text-white shadow-md shadow-[#204382]/20 font-semibold"
                    : "text-gray-500 hover:text-[#204382] hover:bg-slate-100/80"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
                <span className="text-sm tracking-wide truncate">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-slate-50/50">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-sm font-medium"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200/80 flex flex-col z-50 select-none shadow-xl"
            >
              <div className="h-16 px-5 border-b border-gray-200/80 flex items-center gap-3 shrink-0">
                <img
                  src={logoSmk}
                  alt="Logo SMK TI"
                  className="h-9 w-9 object-contain"
                />
                <span className="font-cabinet font-bold text-xl tracking-wide text-[#204382]">
                  SMKTI SPMB
                </span>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
                {navList.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 font-medium ${
                        isActive
                          ? "bg-[#204382] text-white shadow-md shadow-[#204382]/20 font-semibold"
                          : "text-gray-500 hover:text-[#204382] hover:bg-slate-100/80"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />
                      <span className="text-sm tracking-wide">
                        {item.title}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-gray-100 bg-slate-50/50 shrink-0">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-5 h-5 shrink-0" />
                  <span>Keluar Akun</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}