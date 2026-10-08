import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, updateProfile } from "../../../services/api";

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [userId, setUserId] = useState<number | string>("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setFetching(true);
      const user = await getMyProfile();

      setUserId(user.id_user || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
    } catch (err: any) {
      setErrorMessage("Gagal memuat data profil.");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      const cleanUsername = username.toLowerCase().trim().replace(/\s+/g, "_");
      const res = await updateProfile({
        username: cleanUsername,
        email: email,
      });

      const updatedUser = res?.data || res?.user || { id_user: userId, username: cleanUsername, email };
      const savedUser = JSON.parse(localStorage.getItem("user_data") || "{}");
      localStorage.setItem("user_data", JSON.stringify({ ...savedUser, ...updatedUser, username: cleanUsername, email }));

      setSuccessMessage("Profil berhasil diperbarui!");
      await fetchProfileData();
      window.location.reload();
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Gagal memperbarui data profil."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-gray-500 text-sm">
        Memuat data profil...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-100 my-6">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#204382]">Pengaturan Profil</h2>
          <p className="text-xs text-gray-500 mt-1">
            Kelola ID, Username, dan Email akun Anda
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/support")}
          className="text-xs text-[#204382] font-semibold hover:underline bg-blue-50 px-3 py-1.5 rounded-lg"
        >
          Butuh Bantuan?
        </button>
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 text-xs rounded-lg text-center">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded-lg text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-700">
            ID User
          </label>
          <input
            type="text"
            value={userId}
            disabled
            className="w-full px-3.5 py-2 rounded-lg border border-gray-200 bg-gray-100 text-sm text-gray-500 cursor-not-allowed font-semibold"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#204382]"
            placeholder="username"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#204382]"
            placeholder="email@domain.com"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-[#204382] hover:bg-[#183260] text-white rounded-lg text-xs font-semibold disabled:bg-gray-400 transition"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}