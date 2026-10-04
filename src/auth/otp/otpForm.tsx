import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoSmk from "../../assets/img/logo-smk.png";
import { verifyOtp, sendOtp } from "../../services/api";

export default function OtpForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mengambil email yang dikirim lewat state navigasi router
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const maskEmail = (emailStr: string) => {
    if (!emailStr.includes("@")) return emailStr;
    const [name, domain] = emailStr.split("@");
    if (name.length <= 2) return `${name}*****@${domain}`;
    return `${name.slice(0, 2)}*****@${domain}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setErrorMessage("Masukkan 6 digit kode OTP lengkap.");
      return;
    }

    if (!email) {
      setErrorMessage("Email tidak ditemukan. Silakan login/register ulang.");
      return;
    }

    setLoading(true);

    try {
      await verifyOtp(email, otpCode);
      navigate("/dashboard");
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Verifikasi OTP gagal."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;
    setResendLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await sendOtp(email);
      setSuccessMessage("Kode OTP baru berhasil dikirim ke email Anda.");
    } catch (err: any) {
      setErrorMessage("Gagal mengirim ulang OTP. Coba lagi.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[420px] mb-3">
        <Link
          to="/"
          className="text-gray-700 hover:text-black text-xs flex items-center gap-2 hover:underline cursor-pointer"
        >
          &larr; Kembali Ke Beranda SPMB
        </Link>
      </div>

      <div className="bg-white rounded-[35px] shadow-2xl w-full max-w-[420px] p-8 flex flex-col items-center">
        <div className="flex justify-center mb-3">
          <img
            src={LogoSmk}
            alt="Logo SMK TI Bali Global Badung"
            className="h-16 w-auto object-contain"
          />
        </div>

        <div className="w-full text-center">
          <h2 className="text-xl font-bold text-[#204382] mb-2">
            Verifikasi OTP
          </h2>
          <p className="text-xs text-gray-600 mb-6 px-2">
            Kami sudah mengirim kode OTP ke email{" "}
            <span className="font-semibold text-gray-800">
              {email ? maskEmail(email) : "email Anda"}
            </span>
          </p>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 text-xs rounded-lg text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="w-10 h-12 text-center text-lg font-bold border border-gray-400 rounded-md focus:outline-none focus:border-[#204382] focus:ring-1 focus:ring-[#204382]"
                />
              ))}
            </div>

            <p className="text-[11px] text-gray-500">
              Masukkan 6 angka yang telah dikirimkan ke email.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#355B8C] hover:bg-[#204382] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm tracking-wide cursor-pointer"
            >
              {loading ? "VERIFIKASI..." : "VERIFIKASI"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-2 items-center">
            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="text-xs text-[#204382] hover:underline font-semibold cursor-pointer disabled:text-gray-400"
            >
              {resendLoading ? "Mengirim Ulang..." : "Kirim Ulang OTP"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="text-xs text-gray-500 hover:text-gray-800 underline cursor-pointer"
            >
              Ubah Email / Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}