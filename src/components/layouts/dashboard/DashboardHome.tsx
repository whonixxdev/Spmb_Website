import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import NavbarDashboard from "../../ui/Asidebar/NavbarDashboard";
import BerandaAdmin from "./beranda/BerandaAdmin";
import BerandaSiswa from "./beranda/BerandaSiswa";

export default function HomeDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const storedUser = JSON.parse(localStorage.getItem("user_data") || "{}");
  const currentUser = user || storedUser;

  const rawRole = (currentUser?.role || "siswa").toLowerCase();
  const userRole: "siswa" | "admin" =
    rawRole === "admin" || rawRole === "panitia" ? "admin" : "siswa";

  const userName =
    currentUser?.nama_lengkap || currentUser?.username || "Pengguna";
  const userEmail = currentUser?.email || "";
  const AdminComponent = BerandaAdmin as unknown as React.ComponentType;

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <NavbarDashboard
        userRole={userRole}
        userName={userName}
        userEmail={userEmail}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200/80 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-bold text-gray-800">
            {userRole === "admin"
              ? "Panel Administrasi SPMB"
              : "Portal Pendaftaran Siswa"}
          </h1>
        </header>

        <div className="p-8 flex-1">
          {userRole === "admin" ? <AdminComponent /> : <BerandaSiswa />}
        </div>
      </main>
    </div>
  );
}