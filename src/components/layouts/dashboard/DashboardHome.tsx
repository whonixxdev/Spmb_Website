import { Outlet, useNavigate } from "react-router-dom";
import NavbarDashboard from "../../ui/Asidebar/NavbarDashboard";
import { useAuth } from "../../../context/AuthContext";

export default function HomeDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Ambil data user dari AuthContext (atau fallback ke localStorage jika Context kosong)
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUser = user || storedUser;

  const rawRole = (currentUser?.role || "siswa").toLowerCase();
  const userRole: "siswa" | "admin" = rawRole === "admin" || rawRole === "panitia" ? "admin" : "siswa";

  const userName = currentUser?.nama_lengkap || currentUser?.name || "Pengguna";
  const userEmail = currentUser?.email || "";

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

      {/* Main Content View */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200/80 px-8 flex items-center justify-between sticky top-0 z-20">
          <h1 className="text-lg font-bold text-gray-800">
            {userRole === "admin" ? "Panel Administrasi SPMB" : "Portal Pendaftaran Siswa"}
          </h1>
        </header>

        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}